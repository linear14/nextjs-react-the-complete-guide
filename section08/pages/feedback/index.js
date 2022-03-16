import { useState } from "react";
import {
  buildFeedbackPath,
  extractFeedback,
} from "../../helpers/feedback-util";

function FeedbackPage(props) {
  const [selectedFeedback, setSelectedFeedback] = useState();

  async function loadSelectedFeedback(id) {
    const response = await fetch(`/api/feedback/${id}`);
    const data = await response.json();

    setSelectedFeedback(data.feedback);
  }

  return (
    <>
      {selectedFeedback && <p>{selectedFeedback.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => loadSelectedFeedback(item.id)}>
              Show Detail
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = await extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
