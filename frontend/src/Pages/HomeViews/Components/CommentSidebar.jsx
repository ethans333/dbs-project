import RightSideMenu from "../../../Components/RightSideMenu";
import { formatDate } from "../../../Components/helpers";
import { useContext } from "react";
import { Context } from "../../../ProjectContext";

import star_filled from "../../../assets/star-solid.svg";
import star_empty from "../../../assets/star-regular.svg";
import send from "../../../assets/arrow-right-solid.svg";
import xmark from "../../../assets/xmark-solid.svg";

export default function () {
  const { setShowRightSideMenu } = useContext(Context);

  return (
    <RightSideMenu>
      <div className="rounded-lg overflow-hidden">
        <div className="bg-[#ffcc00] pt-7 pb-5 border-b-[3px] border-black px-5">
          <div className="font-extrabold text-lg tracking-wide">
            Comments 💭
          </div>
          <img
            onClick={() => setShowRightSideMenu(false)}
            src={xmark}
            className="w-[14px] absolute top-3 right-3 cursor-pointer hover:opacity-50"
          />
        </div>
        <div className="space-y-5 pt-3 h-[75vh] overflow-y-scroll border-b px-5">
          <CommentCard
            text="Officia officia tempor excepteur cupidatat consequat."
            rating={1}
            timestamp={Date.now()}
          />
          <CommentCard
            text="Est sunt nostrud exercitation Lorem adipisicing adipisicing voluptate commodo dolor."
            rating={3}
            timestamp={Date.now()}
          />
          <CommentCard
            text="In pariatur aute deserunt irure ex quis pariatur et in."
            rating={5}
            timestamp={Date.now()}
          />
          <CommentCard
            text="Officia officia tempor excepteur cupidatat consequat."
            rating={1}
            timestamp={Date.now()}
          />
          <CommentCard
            text="In pariatur aute deserunt irure ex quis pariatur et in."
            rating={5}
            timestamp={Date.now()}
          />
        </div>
        <div className="flex px-5">
          <textarea
            className="w-full border rounded shadow-lg px-3 my-4 py-4 flex justify-center"
            cols={30}
            rows={2}
            name="comment"
            placeholder="Comment"
            style={{ resize: "none" }}
            //   onChange={(e) => setDescription(e.target.value)}
            //   value={description}
          />
          <img
            src={send}
            className="w-4 mx-2 cursor-pointer hover:opacity-50"
          />
        </div>
      </div>
    </RightSideMenu>
  );
}

function CommentCard({ text, rating, timestamp }) {
  return (
    <div className="rounded-lg shadow p-7 space-y-3">
      <div className="flex">
        <Rating rating={rating} />
        <p className="text-sm text-gray-400 text-right ml-auto">
          {formatDate(timestamp)}
        </p>
      </div>
      <div>{text}</div>
    </div>
  );
}

function Rating({ rating }) {
  const maxRating = 5;
  const stars = [];

  for (let i = 0; i < maxRating; i++)
    stars.push(
      <img className="w-4" src={i < rating ? star_filled : star_empty} />
    );

  return <div className="flex">{stars}</div>;
}
