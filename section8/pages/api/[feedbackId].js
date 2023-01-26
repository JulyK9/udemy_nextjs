// 단일 피드백의 details를 페칭하기 위해 동적 api 라우터를 구현하는 케이스
import { buildFeedbackPath, extractFeedback } from "./feedback";

function handler(req, res) {
  // 쿼리 매개변수와 일반 매개변수에 액세스하게 해주는 req.query
  // feedbackId는 파일 제목으로 썼던 대괄호 안의 문자열

  // query를 통해 선택한 피드백 id 추출
  const feedbackId = req.query.feedbackId;

  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);

  // 전체 데이터중에서 요청한 id랑 매칭되는 피드백 데이터만 필터링
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );
  // response로 해당 자료 응답
  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
