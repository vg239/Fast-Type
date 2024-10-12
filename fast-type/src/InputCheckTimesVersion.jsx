import React, { useState, useEffect, useCallback } from 'react';
import WrapWords from './WrapWords';
import Timer from './Timer';
import wordList from './words.json';

const InputCheckTimesVersion = ({ value }) => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [correctness, setCorrectness] = useState([]);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  const initialTime = value;

  const generateWords = useCallback(() => {
    const result = [];
    for (let i = 0; i < 1000; i++) {
      result.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    return result;
  }, []);

  const [words, setWords] = useState(generateWords());

  useEffect(() => {
    const handleKeyDown = (event) => {
      const pressedKey = event.key;

      if (!timerStarted) {
        setTimerStarted(true);
      }

      if (pressedKey === " ") {
        event.preventDefault();
        if (activeLetterIndex > 0) {
          setActiveWordIndex((prevIndex) => prevIndex + 1);
          setActiveLetterIndex(0);
        }
        return;
      }

      if (pressedKey === "Backspace") {
        setActiveLetterIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        setCorrectness((prevCorrectness) => {
          const newCorrectness = [...prevCorrectness];
          if (newCorrectness[activeWordIndex]) {
            newCorrectness[activeWordIndex].pop();
          }
          return newCorrectness;
        });
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
          if (activeLetterIndex < currentWord.length) {
            newCorrectness[activeWordIndex][activeLetterIndex] = isCorrect ? 'correct' : 'incorrect';
          } else {
            newCorrectness[activeWordIndex][activeLetterIndex] = { status: 'extra', char: pressedKey };
          }
          return newCorrectness;
        });
      
        setActiveLetterIndex((prevIndex) => prevIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLetterIndex, activeWordIndex, timerStarted, words]);

  const calculateWPM = () => {
    // Calculate Gross WPM
    const totalCharactersTyped = activeWordIndex * 5 + activeLetterIndex; // Assuming each word is 5 characters
    const grossWordsTyped = totalCharactersTyped / 5;
    const minutes = initialTime / 60;
    const grossWPM = Math.round(grossWordsTyped / minutes);
  
    // Calculate Net WPM
    const correctCharactersTyped = correctness.reduce((acc, word) => {
      return acc + word.filter(letter => letter === 'correct').length;
    }, 0);
    const netWordsTyped = correctCharactersTyped / 5;
    const netWPM = Math.round(netWordsTyped / minutes);
  
    return { grossWPM, netWPM };
  };
  
  // Usage example
  const { grossWPM, netWPM } = calculateWPM();
  console.log(`Gross WPM: ${grossWPM}, Net WPM: ${netWPM}`); 

  const handleTimeUp = () => {
    setIsTimeUp(true);
  };


  return (
    <div className="relative w-full">
    <div className="fixed top-4 right-4 text-white">
      <Timer startTimer={timerStarted} onTimeUp={handleTimeUp} initialTime={initialTime} />
    </div>
    <WrapWords words={words} activeWordIndex={activeWordIndex} activeLetterIndex={activeLetterIndex} correctness={correctness} />
    <p></p>
      <p>Gross WPM: {grossWPM}</p>
      <p>Net WPM: {netWPM}</p>
  </div>
  );
};

export default InputCheckTimesVersion;