import { useContext, useRef } from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const inputRef = useRef();
  const notiCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();

    notiCtx.showNotification({
      title: "서버 요청 중...",
      message: "서버로 데이터를 요청하고 있습니다.",
      status: "pending",
    });

    try {
      const reqBody = {
        email: inputRef.current.value,
      };

      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      notiCtx.showNotification({
        title: "등록 완료",
        message: `${data.email}님의 구독 신청이 완료되었습니다.`,
        status: "success",
      });
    } catch (e) {
      notiCtx.showNotification({
        title: "에러 발생",
        message: e.message || "알 수 없는 오류가 발생했습니다.",
        status: "error",
      });
    }
  }

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
            ref={inputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
