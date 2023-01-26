import fs from "fs";
import path from "path";

// 여기 말고도 다른 곳에서 쓰이기 때문에 export로 빼는 경우 아예 루트경로에서 helpers 폴더안에 파일을 만들고 함수를 저장해서 사용해도 좋음
export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}
export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath); // 먼저 해당 경로의 파일의 데이터를 읽음
  const data = JSON.parse(fileData); // 읽은 데이터를 js 객체로 변환
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email; // FE에서 넘어오는 객체 자료의 형태를 확인하여 request body의 특정 데이터 추출
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(), // 임의로 id 설정 (2개의 요청을 동시에 하는 거라 좋은 id는 아님)
      email: email,
      text: feedbackText,
    };

    // DB나 파일에 저장
    // const filePath = path.join(process.cwd(), "data", "feedback.json"); // 저장할 로컬 파일의 절대경로 생성
    const filePath = buildFeedbackPath();

    // const fileData = fs.readFileSync(filePath); // 먼저 해당 경로의 파일의 데이터를 읽음
    // const data = JSON.parse(fileData); // 읽은 데이터를 js 객체로 변환
    const data = extractFeedback(filePath);

    data.push(newFeedback); // 그 데이터(배열)에 FE에서 받아온 데이터를 넣어줌
    fs.writeFileSync(filePath, JSON.stringify(data)); // 다시 해당 경로 파일 데이터를 JSON 형식으로 변환

    // 성공적으로 파일이 업데이트 되면 응답해줄 내용
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    // res.status(200).json({ message: "This Works!" });
    res.status(200).json({ feedback: data });
  }
}

export default handler;
