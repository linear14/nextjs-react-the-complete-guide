import { useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function getCommentList() {
    const { eventId } = props;
    const response = await fetch(`/api/comment/${eventId}`);
    const data = await response.json();
    setCommentList(data.comments);
  }

  useEffect(() => {
    if (showComments) {
      getCommentList();
    }
  }, [showComments]);

  async function addCommentHandler(commentData) {
    // send data to API
    const reqBody = { ...commentData };

    const response = await fetch(`/api/comment/${eventId}`, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={commentList} />}
    </section>
  );
}

export default Comments;
