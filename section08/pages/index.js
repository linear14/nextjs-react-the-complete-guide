import { useState, useRef } from "react";

function HomePage() {
  const [feedbackList, setFeedbackList] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  async function submitFormHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, feedbackText: enteredFeedback };

    const response = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    alert(`${data.feedback.email}님의 피드백 등록`);
  }

  async function loadFeedbackHandler() {
    const response = await fetch("/api/feedback");
    const data = await response.json();

    setFeedbackList(data.feedback);
  }

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
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackList.map((fb) => (
          <li key={fb.id}>{fb.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
