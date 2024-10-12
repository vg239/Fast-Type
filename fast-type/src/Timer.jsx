import React, { useEffect } from 'react';
import useCountdownTimer from './useCountdownTimer';

const Timer = React.memo(({ startTimer, onTimeUp, initialTime }) => {
  const { timeLeft, startTimer: start, isRunning } = useCountdownTimer(initialTime, onTimeUp);

  useEffect(() => {
    if (startTimer && !isRunning) {
      start();
    }
  }, [startTimer, start, isRunning]);

  return (
    <div className="absolute top-0 right-0 p-4 bg-gray-700">
      <span>{timeLeft}s</span>
    </div>
  );
});

export default Timer;