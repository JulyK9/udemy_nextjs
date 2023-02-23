import { useState, useEffect } from "react";
import classes from "./contact-form.module.css";

import Notification from "../ui/notification";

// 전체 http 작업 블록을 한번에 try/catch 하기 위해 별도의 별도의 함수로 빼줘서 사용
async function sendConatactData(contactDetails) {
  const res = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  // return data; // 여기서는 필요없는 작업이므로 안함
}

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");

  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        // requestStatus의 상태에 따라 notification 컴포넌트에 의해 렌더되므로 null로 초기화해줘서 없어지게 해줌
        // requestError의 상태도 같이 초기화해줌
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      // 타이머가 중복실행되면 안되므로 클린업 함수를 반환하면서 기존 타이머를 삭제
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    // add client-side validation (optional)

    // 일단 요청 상태를 '보류'로 설정
    setRequestStatus("pending");

    try {
      // 전체 http 작업 블록을 한번에 try/catch 하기 위해 별도의 별도의 함수로 빼줘서 사용
      await sendConatactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });

      // 데이터를 성공적으로 보낸 뒤 '성공'상태로 전환
      setRequestStatus("success");

      // 메시지 전송후에 사용자 입력내용 제거
      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (error) {
      // 에러가 발생한 경우 '에러'상태로 전환
      setRequestStatus("error");
      // catch 구문 내 객체에서 에러가 난 상황의 메시지를 상태로 저장하고
      // requestStatus가 error 일 때 전달할 데이터의 message 필드에 삽입하기 위한 작업
      setRequestError(error.message);
    }
  };

  // 렌더링 해줄 Notification 컴포넌트는 title, message, status 를 필요로 하므로
  // 현재 컴포넌트에서 데이터 구조를 만들어서 넘겨줘야 함
  let notificationData;

  if (requestStatus === "pending") {
    notificationData = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notificationData = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully.",
    };
  }

  if (requestStatus === "error") {
    notificationData = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            required
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notificationData && (
        <Notification
          status={notificationData.status}
          title={notificationData.title}
          message={notificationData.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
