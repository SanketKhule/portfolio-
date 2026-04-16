"use client";

import { useCallback, useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

type FeedbackItem = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function Page() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const loadFeedback = useCallback(async (isBackgroundRefresh = false) => {
    if (isBackgroundRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
      setErrorMessage("");
    }

    try {
      const response = await fetch("/api/feedback", {
        cache: "no-store",
      });

      const data = (await response.json()) as {
        feedback?: FeedbackItem[];
        message?: string;
      };

      if (data.message) {
        setErrorMessage(data.message);
      }

      if (!response.ok) {
        setErrorMessage(
          data.message ?? "Unable to load feedback right now. Please try again shortly."
        );
      }

      if (Array.isArray(data.feedback)) {
        setFeedbackItems(data.feedback);
      } else {
        setFeedbackItems([]);
      }

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error loading feedback:", error);
      setErrorMessage("Unable to load feedback. Please try refreshing the page.");
      setFeedbackItems([]);
    } finally {
      if (isBackgroundRefresh) {
        setIsRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadFeedback();

    const intervalId = window.setInterval(() => {
      loadFeedback(true);
    }, 15000);

    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        loadFeedback(true);
      }
    };

    window.addEventListener("focus", handleVisibilityOrFocus);
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleVisibilityOrFocus);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
    };
  }, [loadFeedback]);

  const cardItems = feedbackItems.map((item) => ({
    quote: item.message,
    name: item.name,
    title: item.email,
  }));

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-black dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Feedback</h1>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">
            What visitors are saying.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <button
              type="button"
              onClick={() => loadFeedback(true)}
              disabled={isRefreshing}
              className="rounded border border-neutral-300 px-3 py-1 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
            {lastUpdated ? <span>Last updated: {lastUpdated}</span> : null}
          </div>
        </div>

        {loading && (
          <p className="text-center py-8 text-neutral-500">Loading feedback...</p>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded text-center">
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}

        {!loading && feedbackItems.length === 0 && !errorMessage && (
          <div className="text-center py-12">
            <p className="text-neutral-500 dark:text-neutral-400">
              No feedback submitted yet. Be the first to share your thoughts!
            </p>
          </div>
        )}

        {feedbackItems.length > 0 && (
          <InfiniteMovingCards
            items={cardItems}
            direction="left"
            speed="slow"
            pauseOnHover
          />
        )}
      </div>
    </div>
  );
}
