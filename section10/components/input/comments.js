import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props; // [eventId].js 페이지의 comments 컴포넌트에서 props를 통해서 전달됨

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  // 로컬 상태 추가 : 상태가 하나의 컴포넌트에만 영향을 미칠 때는 전역으로 관리할 필요가 없으니까!
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  // useContext를 통해 스토어에 생성된 NotificationContext로 객체에 접근
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch("/api/comments/" + eventId)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.comments);
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // 코멘트 작성후 submit 시 데이터를 넘겨주는 핸들러 작동시

    // 우선 펜딩 상태를 보여줌 (NewComment유효성 검사를 통과한후 로직이므로)
    notificationCtx.showNotification({
      // title: "Loading...",
      title: "Sending comment...",
      // message: "Loading for registering the comment.",
      message: "Your comment is currently being stored.",
      status: "pending",
    });

    // send data to API
    // fetch(`api/comments/${eventId}`, {
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // .then((res) => res.json())
      .then((res) => {
        // 응답이 정상적일 경우 json 파싱
        if (res.ok) {
          return res.json();
        }
        // 응답이 정상적이지 않을 경우 then을 통해 이후 에러를 생성하여 catch로 에러를 잡을 수 있도록 유도
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          // message: "Successfully registered the comment.",
          message: "Your commnet was saved.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  // console.log(comments);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {/* 함수자체를 props로 내려줌 */}
      {/* {showComments && <CommentList items={comments} />} */}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
      {/* 아래와 같이 삼항연산으로도 가능하다! */}
      {/* {showComments &&
        (isFetchingComments ? (
          <p>Loading...</p>
        ) : (
          <CommentList items={comments} />
        ))} */}
    </section>
  );
}

export default Comments;
