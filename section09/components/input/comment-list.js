import { useEffect } from "react";
import classes from "./comment-list.module.css";

function CommentList() {
  async function getCommentList() {
    const response = await fetch("/api/comment");
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
