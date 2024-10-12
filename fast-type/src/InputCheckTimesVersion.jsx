import React, { useState, useEffect, useCallback, useRef } from 'react';
import WrapWords from './WrapWords';
import Timer from './Timer';
import wordsList from './words.json';

const InputCheckTimesVersion = ({ value }) => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [correctness, setCorrectness] = useState([]);
  const [startTimer, setStartTimer] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [grossWPM, setGrossWPM] = useState(0);
  const [netWPM, setNetWPM] = useState(0);
  const startTimeRef = useRef(null);

  const generateWords = useCallback(() => {
    const result = [];
    for (let i = 0; i < value; i++) {
      result.push(wordsList[Math.floor(Math.random() * wordsList.length)]);
    }
    return result;
  }, [value]);

  const [words, setWords] = useState(generateWords());

  useEffect(() => {
    setWords(generateWords());
  }, [value, generateWords]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const pressedKey = event.key;

      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
        setStartTimer(true);
      }

      if (pressedKey === " ") {
        event.preventDefault(); // Prevent the default spacebar behavior
        if (activeLetterIndex > 0) {
          setActiveWordIndex((prevIndex) => prevIndex + 1);
          setActiveLetterIndex(0);
        }
        return;
      }

      if (pressedKey === "Backspace") {
        if (activeLetterIndex > 0) {
          setActiveLetterIndex((prevIndex) => prevIndex - 1);
        }
        return;
      }

      if (pressedKey.length === 1) {
        const currentWord = words[activeWordIndex];
        const isCorrect = pressedKey === currentWord[activeLetterIndex];
        setCorrectness((prevCorrectness) => {
          const newCorrectness = [...prevCorrectness];
          if (!newCorrectness[activeWordIndex]) {
            newCorrectness[activeWordIndex] = [];
          }
          newCorrectness[activeWordIndex][activeLetterIndex] = isCorrect ? 'correct' : 'incorrect';
          return newCorrectness;
        });
        setActiveLetterIndex((prevIndex) => prevIndex + 1);
      }

      // Check if the user has finished typing the last letter
      if (activeWordIndex === words.length - 1 && activeLetterIndex === words[activeWordIndex].length - 1) {
        setStartTimer(false);
        const endTime = Date.now();
        const elapsed = endTime - startTimeRef.current;
        setElapsedTime(elapsed);
        console.log("Timer stopped. Elapsed time:", elapsed / 1000, "seconds");

        handleTimeUp(elapsed);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLetterIndex, activeWordIndex, words]);

  const calculateWPM = (elapsedTime) => {
    // Calculate Gross WPM
    const totalCharactersTyped = activeWordIndex * 5 + activeLetterIndex; // Assuming each word is 5 characters
    const grossWordsTyped = totalCharactersTyped / 5;
    const minutes = elapsedTime / 60000; // Convert milliseconds to minutes
    const grossWPM = Math.round(grossWordsTyped / minutes);
  
    // Calculate Net WPM
    const correctCharactersTyped = correctness.reduce((acc, word) => {
      return acc + word.filter(letter => letter === 'correct').length;
    }, 0);
    const netWordsTyped = correctCharactersTyped / 5;
    const netWPM = Math.round(netWordsTyped / minutes);
  
    return { grossWPM, netWPM };
  };

  const handleTimeUp = (elapsed) => {
    setIsTimeUp(true);
    const { grossWPM, netWPM } = calculateWPM(elapsed);
    setGrossWPM(grossWPM);
    setNetWPM(netWPM);
    console.log(`Gross WPM: ${grossWPM}, Net WPM: ${netWPM}`);
  };

  useEffect(() => {
    if (isTimeUp) {
      const { grossWPM, netWPM } = calculateWPM(elapsedTime);
      setGrossWPM(grossWPM);
      setNetWPM(netWPM);
      console.log(`Gross WPM: ${grossWPM}, Net WPM: ${netWPM}`);
    }
  }, [isTimeUp, elapsedTime]);

  const resetWPM = () => {
    setGrossWPM(0);
    setNetWPM(0);
    setIsTimeUp(false);
    setActiveWordIndex(0);
    setActiveLetterIndex(0);
    setCorrectness([]);
    setStartTimer(false);
    setElapsedTime(0);
    startTimeRef.current = null;
    setWords(generateWords());
  };

  return (
    <div className="relative w-full">
      <WrapWords words={words} activeWordIndex={activeWordIndex} activeLetterIndex={activeLetterIndex} correctness={correctness} />
      <Timer start={startTimer} onStop={(time) => {
        setElapsedTime(time);
        handleTimeUp(time); // Call to handle time up
      }} />
      {isTimeUp ? (
        <>
          <p>Elapsed Time: {(elapsedTime / 1000).toFixed(2)} seconds</p>
          <p>Gross WPM: {grossWPM}</p>
          <p>Net WPM: {netWPM}</p>
          <button onClick={resetWPM}>Reset</button>
        </>
      ) : (
        <>
          <p>Elapsed Time: 0 seconds</p>
          <p>Gross WPM: 0</p>
          <p>Net WPM: 0</p>
        </>
      )}
    </div>
  );
};

export default InputCheckTimesVersion;