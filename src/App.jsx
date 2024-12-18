import React, { useState, useRef } from "react";
import "./index.css";
import background from "../src/assets/bgimage.jpg";

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  // Start or Pause Timer
  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  // Reset Timer
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  // Add Lap Time
  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  // Format Time Display
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const millisecondsPart = String(Math.floor((milliseconds % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${millisecondsPart}`;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={background}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Stopwatch Container */}
      <div className="relative z-10 bg-gray-900/80 shadow-2xl p-8 rounded-3xl text-white text-center backdrop-blur-lg">
        <h1 className="text-4xl font-bold mb-4">Stopwatch</h1>
        <div className="text-6xl font-bold mb-6">{formatTime(time)}</div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleStartPause}
            className="px-6 py-2 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={handleLap}
            className="px-6 py-2 bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            disabled={!isRunning}
          >
            Lap
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Reset
          </button>
        </div>

        {/* Laps */}
        {laps.length > 0 && (
          <div className="mt-6 max-h-60 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-2">Lap Times</h2>
            <ul className="text-lg">
              {laps.map((lap, index) => (
                <li key={index} className="p-2 border-b border-gray-700">
                  Lap {index + 1}: {formatTime(lap)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
