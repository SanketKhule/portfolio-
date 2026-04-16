import { getDatabase } from "@/lib/mongodb";
import type { Collection } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type FeedbackBody = {
  name: string;
  email: string;
  message: string;
};

type FeedbackItem = FeedbackBody & {
  id: string;
  createdAt: string;
};

type FeedbackDocument = FeedbackBody & {
  id: string;
  createdAt: Date;
};

const FEEDBACK_COLLECTION_NAME = "feedback";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const globalForFeedback = globalThis as typeof globalThis & {
  feedbackIndexPromise?: Promise<string | null>;
  feedbackRateLimitStore?: Map<string, { count: number; resetAt: number }>;
};

function getRateLimitStore() {
  if (!globalForFeedback.feedbackRateLimitStore) {
    globalForFeedback.feedbackRateLimitStore = new Map();
  }

  return globalForFeedback.feedbackRateLimitStore;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(clientIp: string) {
  const now = Date.now();
  const store = getRateLimitStore();
  const current = store.get(clientIp);

  if (!current || current.resetAt <= now) {
    store.set(clientIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  store.set(clientIp, {
    count: current.count + 1,
    resetAt: current.resetAt,
  });

  return false;
}

async function ensureFeedbackIndexes(collection: Collection<FeedbackDocument>) {
  if (!globalForFeedback.feedbackIndexPromise) {
    globalForFeedback.feedbackIndexPromise = collection
      .createIndex(
        { id: 1 },
        {
          name: "feedback_id_unique_idx",
          unique: true,
          sparse: true,
        }
      )
      .catch((error) => {
        // Do not permanently cache failed index attempts.
        globalForFeedback.feedbackIndexPromise = undefined;
        console.warn("Feedback index creation failed:", error);
        return null;
      });
  }

  await globalForFeedback.feedbackIndexPromise;
}

function normalizeValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function toFeedbackItem(document: FeedbackDocument): FeedbackItem {
  return {
    id: document.id,
    name: document.name,
    email: document.email,
    message: document.message,
    createdAt: document.createdAt.toISOString(),
  };
}

function isMongoConnectivityError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  return (
    message.includes("server selection timed out") ||
    message.includes("etimedout") ||
    message.includes("mongoserverselectionerror") ||
    message.includes("replicasetnoprimary") ||
    message.includes("querysrv enotfound")
  );
}

function isMongoConfigurationError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  return (
    message.includes("missing mongodb_uri") ||
    message.includes("authentication failed") ||
    message.includes("bad auth") ||
    message.includes("invalid scheme")
  );
}

export async function GET() {
  try {
    const database = await getDatabase();
    const collection = database.collection<FeedbackDocument>(
      FEEDBACK_COLLECTION_NAME
    );
    await ensureFeedbackIndexes(collection);

    const items = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ feedback: items.map(toFeedbackItem) });
  } catch (error) {
    console.error("GET /api/feedback error:", error);

    const connectivityMessage = isMongoConnectivityError(error)
      ? "Could not connect to MongoDB. In Atlas Network Access allow your runtime IP (for Vercel usually 0.0.0.0/0), then verify MONGODB_URI/MONGODB_DB."
      : isMongoConfigurationError(error)
        ? "MongoDB configuration is invalid. Verify MONGODB_URI and MONGODB_DB in your environment."
        : "Feedback service is temporarily unavailable. Showing an empty list.";

    return NextResponse.json(
      {
        message: connectivityMessage,
        feedback: [],
      },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  let payload: FeedbackBody | null = null;

  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          message:
            "Too many requests. Please wait a minute before sending more feedback.",
        },
        { status: 429 }
      );
    }

    let body: Partial<FeedbackBody>;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid request body." },
        { status: 400 }
      );
    }

    payload = {
      name: normalizeValue(body.name),
      email: normalizeValue(body.email),
      message: normalizeValue(body.message),
    };

    // Validate required fields
    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json(
        { message: "Name, email, and feedback are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    if (!isValidEmail) {
      return NextResponse.json(
        { message: "Enter a valid email address." },
        { status: 400 }
      );
    }

    const database = await getDatabase();
    const collection = database.collection<FeedbackDocument>(
      FEEDBACK_COLLECTION_NAME
    );
    await ensureFeedbackIndexes(collection);

    const createdAt = new Date();
    const newFeedbackDocument: FeedbackDocument = {
      id: crypto.randomUUID(),
      name: payload.name,
      email: payload.email,
      message: payload.message,
      createdAt,
    };

    await collection.insertOne(newFeedbackDocument);

    const newFeedback: FeedbackItem = {
      ...newFeedbackDocument,
      createdAt: createdAt.toISOString(),
    };

    return NextResponse.json(
      { message: "Feedback saved successfully.", feedback: newFeedback },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/feedback error:", error);

    const failureMessage = isMongoConnectivityError(error)
      ? "Could not connect to MongoDB. In Atlas Network Access allow your runtime IP (for Vercel usually 0.0.0.0/0), then verify MONGODB_URI/MONGODB_DB."
      : isMongoConfigurationError(error)
        ? "MongoDB configuration is invalid. Verify MONGODB_URI and MONGODB_DB in your environment."
        : "Failed to save feedback. Please try again later.";

    return NextResponse.json(
      { message: failureMessage },
      { status: 503 }
    );
  }
}