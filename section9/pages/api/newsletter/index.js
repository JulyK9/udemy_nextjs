function handler(req, res) {
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

    console.log(userEmail);
    // res.status(201).json({ message: "success", addedEmail: userEmail });
  }
}

export default handler;
