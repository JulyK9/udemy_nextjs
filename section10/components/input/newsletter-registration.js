import { useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const currentEmail = emailInputRef.current.value;

    // 참고로 서버측에서도 유효성 검사를 해주는 게 좋음
    if (!currentEmail || !currentEmail.includes("@")) {
      alert("유효하지 않은 이메일 입니다. Invalid email address.");
      return;
    }

    const reqBody = {
      email: currentEmail,
    };

    fetch("api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data.message));

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
