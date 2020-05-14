import { getDatabase } from '../db/db.ts';

const db = getDatabase();
const gifs = db.collection("gifs");
