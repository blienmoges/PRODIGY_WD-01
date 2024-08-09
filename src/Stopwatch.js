import React, { useState, useRef } from "react";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const pause = () => {
    if (isActive) {
      clearInterval(intervalRef.current);
      setIsActive(false);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (isActive) {
      const currentTime = time;
      const lastLapTime = laps.length ? laps[laps.length - 1].time : 0;
      const lapTime = currentTime - lastLapTime;
      setLaps([...laps, { time: currentTime, lapTime }]);
    }
  };

  const formatTime = (time) => {
    const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="time">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
        <button onClick={lap}>Lap</button>
      </div>
      <div className="laps">
        {laps.map((lap, index) => (
          <div key={index} className="lap">
            {`Lap ${index + 1}: ${formatTime(lap.lapTime)} (Total: ${formatTime(
              lap.time
            )})`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;
