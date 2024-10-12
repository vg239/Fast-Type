import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ start}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (start && !startTimeRef.current) {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        const newElapsedTime = currentTime - startTimeRef.current;
        setElapsedTime(newElapsedTime);
      }, 100); // Update every 100ms
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [start]);

  return null; // No UI component is needed, the logic is handled internally
};

export default Timer;