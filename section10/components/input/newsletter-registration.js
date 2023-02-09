import { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();

  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const currentEmail = emailInputRef.current.value;

    // 참고로 서버측에서도 유효성 검사를 해주는 게 좋음
    if (!currentEmail || !currentEmail.includes("@")) {
      alert("유효하지 않은 이메일 입니다. Invalid email address.");
      return;
    }
    // 유효성 검사를 통과하면

    // 대기 상태 메시지를 먼저 보여주고
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    const reqBody = {
      email: currentEmail,
    };

    // 해당 api로 요청 보냄
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // 응답에 문제가 없으면
        if (res.ok) {
          return res.json();
        }
        // 응답에 문제가 있으면 에러를 발생시키는 프로미스 체인을 반환
        // 에러를 발생시켜야 catch 블록이 실행되니까
        // then 블록에서 에러를 발생시켜서 해당 프로미스를 거부하도록 함
        return res.json().then((data) => {
          // 응답에 메시지가 있다면 에러 메시지로 사용하고 아니면 폴백 메시지
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter!.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something weng wrong!", // 해당 에러로부터 메시지를 가져오거나 에러에 포함된 메시지가 없으면 폴백 메시지
          status: "error",
        });
      });

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }
  // console.log(emailRef.current.value);

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
