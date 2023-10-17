import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  useEffect(
    function () {
      const timerID = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(timerID);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {formatTime(mins)}:{formatTime(seconds)}
    </div>
  );
}

export default Timer;
