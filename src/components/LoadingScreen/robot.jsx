import React, { useEffect, useState } from "react";
import robotGif from "../../assets/gif/robot.gif";

const robot = ({ isAwake }) => {
  const [robotOpacity, setOpacity] = useState(5);
  const [isShown, setShown] = useState(true);
  useEffect(() => {
    if (isAwake) {
      let robotOpaNum = robotOpacity;
      const intervalId = setInterval(() => {
        robotOpaNum = robotOpaNum - 1;
        if (robotOpaNum < 0) {
          setOpacity(0);
          clearInterval(intervalId);
          let hideCount = 5;
          const hideIntervalId = setInterval(() => {
            hideCount = hideCount--;
            if (hideCount < 0) {
              setShown(false);
              clearInterval(intervalId);
            } else {
              hideCount--;
            }
          }, 100);
          return () => {
            clearInterval(hideIntervalId);
          };
        } else {
          setOpacity(robotOpaNum);
        }
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isAwake]);
  return (
    <>
      <div
        className={`w-screen h-screen justify-center absolute flex flex-col items-center bg-[#ffffff] ease-out duration-1000 transition-all z-[100] ${
          robotOpacity > 0 ? "opacity-100" : "opacity-0"
        } ${isShown ? "" : "hidden"}
        `}
      >
        <img className="h-[30vh]" src={robotGif} alt="my-gif" />
        <p className="text-4xl font-extrabold">Loading resources...</p>
      </div>
    </>
  );
};

export default robot;
