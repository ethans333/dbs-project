import { useEffect, useState } from "react";

import RightSideMenu from "../../../Components/RightSideMenu";
import { formatDate } from "../../../Components/helpers";
import { useContext } from "react";
import { Context } from "../../../ProjectContext";

import star_filled from "../../../assets/star-solid.svg";
import star_empty from "../../../assets/star-regular.svg";
import send from "../../../assets/arrow-right-solid.svg";
import xmark from "../../../assets/xmark-solid.svg";

export default function ({ event_id }) {
  const { userId, setShowRightSideMenu } = useContext(Context);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    getComments();
  }, [event_id]);

  return (
    <RightSideMenu>
      <div className="rounded-lg overflow-hidden">
        <div className="bg-[#ffcc00] pt-7 pb-5 border-b-[3px] border-black px-5">
          <div className="font-semibold text-lg">Comments</div>
          <img
            onClick={() => setShowRightSideMenu(false)}
            src={xmark}
            className="w-[14px] absolute top-3 right-3 cursor-pointer hover:opacity-50"
          />
        </div>
        <div className="space-y-5 pt-3 h-[75vh] overflow-y-scroll border-b px-5">
          {comments.length == 0 ? (
            <div className="text-center mt-[30vh] text-lg">
              Be the first to comment!
            </div>
          ) : (
            comments.map((comment) => (
              <CommentCard
                key={comment.comment_id}
                text={comment.text}
                rating={Math.ceil(
                  comment.total_rating / comment.number_of_ratings
                )}
                timestamp={comment.timestamp}
                comment_id={comment.comment_id}
              />
            ))
          )}
        </div>

        <div className="flex mx-5 h-[15vh] border rounded shadow my-4 py-4 pr-5">
          <textarea
            className="px-3 focus:outline-none w-full"
            cols={30}
            rows={2}
            name="comment"
            placeholder="Comment"
            style={{ resize: "none" }}
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
          />
          <img
            src={send}
            className="w-4 cursor-pointer hover:opacity-50 h-fit"
            onClick={postComment}
          />
        </div>
      </div>
    </RightSideMenu>
  );

  function getComments() {
    fetch(`${import.meta.env.VITE_API_URL}/comments/${event_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComments(data);
      });
  }

  function postComment() {
    fetch(`${import.meta.env.VITE_API_URL}/comments/${event_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: commentText,
        user_id: localStorage.getItem("userId"),
        rating: 0,
        date: Date.now(),
      }),
    }).then(() => {
      getComments();
      setCommentText("");
    });
  }

  function CommentCard({ text, rating, timestamp, comment_id }) {

    const [newText, setNewText] = useState(text);

    return (
      <div className="rounded-lg shadow p-7 space-y-3">
        <div className="flex">
          <Rating rating={rating} comment_id={comment_id} />
          <p className="text-sm text-gray-400 text-right ml-auto">
            {formatDate(timestamp)}
          </p>
        </div>
        <div>{text}</div>
        <input className="border rounded-full" type="text" value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="New Comment"/>
        <div className="flex w-full space-x-32">
          <div onClick={() => {
            if (newText == "") return;
            editComment(comment_id, newText).then(() => setNewText(""));
          }} className="text-blue-500 cursor-pointer hover:opacity-50">Edit</div>
          <div onClick={() => deleteComment(comment_id)} className="text-red-500 cursor-pointer hover:opacity-50">Delete</div>
        </div>
      </div>
    );
  }

  function Rating({ rating, comment_id }) {
    const maxRating = 5;
    const stars = [];

    for (let i = 0; i < maxRating; i++)
      stars.push(
        <img
          key={i}
          className="w-4 hover:opacity-50 cursor-pointer"
          src={i < rating ? star_filled : star_empty}
          onClick={() => {
            // Rate comment
            fetch(
              `${import.meta.env.VITE_API_URL}/comments/rating/${comment_id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  rating: i + 1,
                }),
              }
            ).then(() => {
              getComments();
            });
          }}
        />
      );

    return <div className="flex">{stars}</div>;
  }

  function deleteComment (comment_id) {
    console.log("comment deleted");
    fetch(`${import.meta.env.VITE_API_URL}/comments/${comment_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => getComments());
  }

  function editComment (comment_id, text) {
    console.log("comment edited");
    fetch(`${import.meta.env.VITE_API_URL}/comments/${comment_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    }).then(() => getComments());
  }
}
