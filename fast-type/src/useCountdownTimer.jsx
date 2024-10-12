import { useState, useEffect, useRef } from 'react';

const useCountdownTimer = (initialTime, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now();
      runTimer();
    }
  };

  const runTimer = () => {
    const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
    const newTimeLeft = Math.max(initialTime - elapsedTime, 0);
    setTimeLeft(Math.ceil(newTimeLeft));

    if (newTimeLeft > 0) {
      animationFrameRef.current = requestAnimationFrame(runTimer);
    } else {
      onTimeUp();
      setIsRunning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return { timeLeft, startTimer, isRunning };
};

export default useCountdownTimer;