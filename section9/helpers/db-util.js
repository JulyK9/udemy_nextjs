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
    .find(filter) // 추가한 filter 매개변수를 사용하도록 수정, find 메서드는 컬렉션에서 데이터를 찾아주고 결과를 필터링해줌
    .sort(sort) // sort()는 결과를 정렬시켜줌 => 사용시 객체로 전달하면서 정렬할 키속성과 -1, +1로 내림차순,오름차순을 정해줌
    .toArray(); // 모든 문서를 배열로 받기위해 배열화해줌 => 컬렉션의 모든 엔트리를 배열로 제공해줌

  return documents;
}
