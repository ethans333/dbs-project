import { useContext, useEffect, useState } from "react";
import { Context } from "../ProjectContext";

export default function (props) {
  const { showRightSideMenu } = useContext(Context);
  const [animation, setAnimation] = useState("animate-shiftRL");
  const [showState, setShowState] = useState(false);

  useEffect(() => {
    if (showRightSideMenu) {
      setAnimation("animate-shiftRL");
      setTimeout(() => {
        setShowState(true);
      }, 100);
    } else {
      setAnimation("animate-shiftLR");
      setTimeout(function () {
        setShowState(false);
      }, 0);
    }
  }, [showRightSideMenu]);

  return (
    showState && (
      <div
        className={`bg-white z-20 w-96 h-screen absolute top-0 right-0 shadow-lg border-none ${animation}`}
      >
        {props.children}
      </div>
    )
  );
}
