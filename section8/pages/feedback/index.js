// import { buildFeedbackPath, extractFeedback } from "../api/feedback";
import { buildFeedbackPath, extractFeedback } from "../api/feedback/index";
import { useState } from "react";

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    // 동적 라우터 트리거 하기
    // fetch('/api/' + id)
    // fetch(`/api/${id}`) // /api/some-feedbackId
    fetch(`/api/feedback/${id}`) // /api/feedback/some-feedbackId
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data.feedback); // 동적 라우트 api에서 응답해준 데이터의 속성에 따름
      });
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            {/* <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button> */}
            <button onClick={() => loadFeedbackHandler(item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  // Firebase 같은 외부 API로부터 페칭하는게 아니므로 fetch를 쓰지 않고
  // 자체 api를 적용해야 하므로 node.js로 가져오면 됨
  // 단 여기서는 자체 api (api/feedback.js)에서 사용했던 게 있으므로 export시킨후 여기서 import해서 가져와서 적용
  // 즉, 일반 페이지에 API 라우트를 사용해야 할 땐 HTTP 요청을 보내는 대신 동일한 기기, 즉 같은 서버에서 실행한다는 점을 활용해야 험
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
