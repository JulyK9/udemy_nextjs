import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://udemy_jk929jk:roqkfwk929!@boilerplate.axivy.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, dbName, collection, document) {
  const db = client.db(dbName);

  const result = await db.collection(collection).insertOne(document);

  return result;
}

// export async function getAllDocuments(client, collection, sort) {
export async function getAllDocuments(
  client,
  dbName,
  collection,
  sort,
  filter = {}
) {
  const db = client.db(dbName);

  // const documents = await db.collection(collection).find().sort(sort).toArray();
  const documents = await db
    .collection(collection)
    .find(filter) // 추가한 filter 매개변수를 사용하도록 수정
    .sort(sort)
    .toArray();

  return documents;
}
