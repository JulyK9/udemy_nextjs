// /api/contact 형식의 구조로 추가
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    // Store it in a database
    const newMessage = {
      email,
      name,
      message,
    };

    // console.log(newMessage);

    let client;

    try {
      // MongoDB 데이터베이스에 연결
      client = await MongoClient.connect(
        "mongodb+srv://udemy_jk929jk:udemyjk929jk@boilerplate.axivy.mongodb.net/my-site?retryWrites=true&w=majority"
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db("my-site"); // db에 엑세스

    try {
      // db의 컬렉션에서 작업
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId; // db에 메시지가 삽입된 이후 자동 생성된 id를 메시지 객체에 삽입
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client.close(); // 최종 성공하고나서도 db를 닫아주어야함 유의!

    res.status(201).json({ message: "Succesfully stored message!" });
  }
}

export default handler;
