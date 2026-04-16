const { MongoClient } = require("mongodb");

const globalForMongo = globalThis;

function getClientPromise() {
  const connectionString = process.env.MONGODB_URI;
  if (!connectionString) {
    return Promise.reject(new Error("Missing MONGODB_URI environment variable."));
  }

  if (process.env.NODE_ENV === "development") {
    if (!globalForMongo.mongoClientPromise) {
      const client = new MongoClient(connectionString);
      globalForMongo.mongoClientPromise = client.connect();
    }
    return globalForMongo.mongoClientPromise;
  }

  const client = new MongoClient(connectionString);
  return client.connect();
}

async function getDatabase() {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB ?? "portfolio");
}

module.exports = { getDatabase };
