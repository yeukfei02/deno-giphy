import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const client = new MongoClient();
const localDbUri = `mongodb://localhost:27017`;
const dockerDbUri = `mongodb://mongo:27017`;
client.connectWithUri(localDbUri);

const db = client.database("deno-giphy");

export const getDatabase = () => {
  return db;
};
