import { MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  const connectionString = process.env.MONGODB_URI;
  if (!connectionString) {
    return Promise.reject(new Error("Missing MONGODB_URI environment variable."));
  }

  const clientOptions = {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 10000,
  };

  if (process.env.NODE_ENV === "development") {
    if (!globalForMongo.mongoClientPromise) {
      const client = new MongoClient(connectionString, clientOptions);
      globalForMongo.mongoClientPromise = client.connect().catch((error) => {
        globalForMongo.mongoClientPromise = undefined;
        throw error;
      });
    }
    return globalForMongo.mongoClientPromise;
  }

  const client = new MongoClient(connectionString, clientOptions);
  return client.connect();
}

export async function getDatabase() {
  const client = await getClientPromise();
  const configuredDbName = process.env.MONGODB_DB?.trim();

  // If MONGODB_DB is not set, use the default database from MONGODB_URI.
  if (!configuredDbName) {
    return client.db();
  }

  return client.db(configuredDbName);
}
