import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // 유효성 검사 일부 추가 - 기본적인 email 유효성 검사
    // 이렇게 서버측 유효성 검사가 필수는 아니지만 적극 추천함 - 프엔 유효성 검사를 회피하는 방법들도 있기 때문(코드가 사용자에게 노출되기 때문)
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({
        message: "Invalid email address. 유효하지 않은 이메일 주소입니다.",
        // 422 사용자 입력값이 유효하지 않을 때를 나타내는 상태 코드
      });
      return;
    }

    // connect 메서드로 mongodb client에 연결, 연결할 클러스터는 주소를 복사해서 사용
    // id와 pw는 database access 에서 정하고 network access 에서 ip도 허용해줄 것
    const client = await MongoClient.connect(
      "mongodb+srv://udemy_jk929jk:roqkfwk929!@boilerplate.axivy.mongodb.net/?retryWrites=true&w=majority"
    );

    // mongodb 클라이언트의 db에 접근(db네임)
    const db = client.db("newsletter");

    // db에 컬렉션에 접근하여(collection 메서드) 객체를 삽입(insertOne 메서드)
    await db.collection("emails").insertOne({ email: userEmail });

    // 작업후 클라이언트 닫기
    client.close();

    // console.log(userEmail);
    res.status(201).json({ message: `${userEmail} Sign up Success!` });
  }
}

export default handler;
