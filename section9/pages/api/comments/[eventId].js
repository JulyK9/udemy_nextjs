// api/comments/eventId

function handler(req, res) {
  const evetId = req.query.eventId; // path에 입력된 값에 접근해서 id를 가져옴(파일명, 플레이스홀더가 eventId 이므로)

  if (req.method === "POST") {
    // const email = req.body.email;
    // const name = req.body.name;
    // const content = req.body.content;
    const { email, name, text } = req.body; // 구조분해 할당

    // 서버사이드에서 데이터 유효성 검사 추가
    if (
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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);

    res
      .status(201)
      .json({ message: "Add comment success!", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: c1, name: "Bruno", text: "A first comment!" },
      { id: c2, name: "Alex", text: "A Second comment!" },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
