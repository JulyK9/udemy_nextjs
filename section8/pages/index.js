import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();

    // 입력폼 작성값 추출
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    // 예시 : { email: 'test@test.com', text: 'Some test feedback' }
    // http 요청: 현재 도메인 뒤에 붙어서 절대 경로로 작동함
    fetch("api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody), // req를 보내는 것이므로 JSON으로 변환해서 보내야 함
      headers: {
        "Content-Type": "application/json", // 특수문자가 들어가므로 작은따옴표를 쓰는 것 유의
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  function loadFeedbackHandler() {
    fetch("api/feedback")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.feedback);
        setFeedbackItems(data.feedback);
      });
  }
  // feedbackItems && console.log(feedbackItems);

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedback</button>
      <hr />
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
