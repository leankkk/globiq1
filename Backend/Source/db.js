import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

export async function conectar() {
  if (!db) {
    await client.connect();
    db = client.db("globiq");
    console.log("Conectado a MongoDB");
  }
  return db;
}

export async function coleccionCuentas() {
  const database = await conectar();
  return database.collection("cuentas");
}