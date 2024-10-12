import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import WrapWords from './WrapWords';
import TimeTaken from './TimeTaken';
import wordList from './words.json';

const InputCheckWordsVersion = ({ value }) => {
  const navigate = useNavigate();
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [correctness, setCorrectness] = useState([]);
  const [startTimer, setStartTimer] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(null);

  const generateWords = useCallback(() => {
    const result = [];
    for (let i = 0; i < value; i++) {
      result.push(wordList[Math.floor(Math.random() * wordList.length)]);
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

        if (activeWordIndex === words.length - 1 && activeLetterIndex === words[activeWordIndex].length - 1) {
          setStartTimer(false);
          const endTime = Date.now();
          const elapsed = endTime - startTimeRef.current;
          setElapsedTime(elapsed);
          const wpm = calculateWPM(elapsed);
          navigate('/results', { state: { wpm } });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLetterIndex, activeWordIndex, words, navigate]);





    const calculateWPM = (elapsedTimeMs) => {
      // Calculate Gross WPM
      const totalCharactersTyped = activeWordIndex * 5 + activeLetterIndex; // Assuming each word is 5 characters
      console.log(to)
      const grossWordsTyped = totalCharactersTyped / 5;
      const minutes = elapsedTimeMs / 60000;      
      const grossWPM = Math.round(grossWordsTyped / minutes);
    
      // Calculate Net WPM
      const correctCharactersTyped = correctness.reduce((acc, word) => {
        return acc + word.filter(letter => letter === 'correct').length;
      }, 0);
      const netWordsTyped = correctCharactersTyped / 5;
      const netWPM = Math.round(netWordsTyped / minutes);
    
      return { grossWPM, netWPM };
    };
    
    

  return (
    <div className="relative w-full">
    <div className="absolute top-4 right-4 text-pink-500">
      <TimeTaken start={startTimer} onStop={(time) => setElapsedTime(time)} />
    </div>
    <WrapWords words={words} activeWordIndex={activeWordIndex} activeLetterIndex={activeLetterIndex} correctness={correctness} />
  </div>
  );
};

export default InputCheckWordsVersion;