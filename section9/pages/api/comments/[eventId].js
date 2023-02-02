// api/comments/eventId
import { MongoClient } from "mongodb";
import { getAllDocuments } from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId; // path에 입력된 값에 접근해서 id를 가져옴(파일명, 플레이스홀더가 eventId 이므로)

  // 이 부분을 여러군데서 쓴다면 헬퍼함수로 빼는 방법도 좋음
  const client = await MongoClient.connect(
    "mongodb+srv://udemy_jk929jk:roqkfwk929!@boilerplate.axivy.mongodb.net/?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    // const email = req.body.email;
    // const name = req.body.name;
    // const content = req.body.content;
    const { email, name, text } = req.body; // 구조분해 할당

    // 서버사이드에서 데이터 유효성 검사 추가
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return; // 유효하지 않은 입력값이므로 해당함수의 이후 실행을 멈춤
    }

    const newComment = {
      // id: new Date().toISOString(), // db연결시 id가 자동 생성되므로
      email,
      name,
      text,
      eventId, // 해당 댓글이 속한 이벤트에 참조를 갖게하기 위해 추가 속성으로 저장
    };

    const db = client.db("events");

    const result = await db.collection("comments").insertOne(newComment);

    // console.log(newComment);
    console.log("dbResult: ", result);

    newComment.id = result.insertedId; // 생성된 고유 id를 프론트로 보낼 객체의 id로 부여해줌

    res
      .status(201)
      .json({ message: "Add comment success!", comment: newComment });
  }

  if (req.method === "GET") {
    // const dummyList = [
    //   { id: "c1", name: "Bruno", text: "A first comment!" },
    //   { id: "c2", name: "Alex", text: "A Second comment!" },
    // ];

    // const db = client.db("events"); // events db에 접근해서

    // const documents = await db
    //   .collection("comments")
    //   .find() // find 메서드는 컬렉션에더 데이터를 찾아주는데, 결과를 필터링해줄 수도 있음(여기선 모든 댓글이므로)
    //   .sort({ _id: -1 }) // sort()는 결과를 정렬시켜줌 => 객체로 전달하면서 정렬할 키속성과 -1, +1로 내림차순,오름차순을 정해줌
    //   .toArray(); // 모든 문서를 배열로 받기위해 배열화해줌 => 컬렉션의 모든 엔트리를 배열로 제공해줌

    // 헬퍼함수 사용 버전
    const documents = await getAllDocuments(
      client,
      "events",
      "comments",
      { _id: -1 },
      { eventId: eventId } // 헬퍼함수에서 적용한 매개변수를 인자로 적용해서 특정 이벤트에 속항 댓글만 필터링 하도록 해줌
    );

    // res.status(200).json({ comments: dummyList });
    res.status(200).json({ comments: documents });
  }
  client.close(); // 꼭 잊지말고 닫아줘야 함
}

export default handler;
