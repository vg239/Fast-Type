import React, { useState, useEffect } from 'react';
import WrapWords from './WrapWords';

const InputCheck = () => {
  const [inputVal, setInputVal] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [correctness, setCorrectness] = useState([]);

  const words = ["hello", "world", "index", "javascript", "example", "words", "for", "testing", "dance","enjoy", "india","jojo","somewhere","only", "we","hello", "world", "index", "javascript", "example", "words", "for", "testing", "dance","enjoy", "india","hello", "world", "index", "javascript", "example", "words"];

  useEffect(() => {
    const handleKeyDown = (event) => {
      const pressedKey = event.key;
      console.log(`Key down: ${pressedKey}`);

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
            if (activeLetterIndex < words[activeWordIndex].length) {
              newCorrectness[activeWordIndex][activeLetterIndex] = null;
            } else {
              newCorrectness[activeWordIndex].pop();
            }
          }
          return newCorrectness;
        });
        setInputVal(event.target.value);
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
            newCorrectness[activeWordIndex].push(pressedKey);
            console.log(`Adding incorrect extra character: ${pressedKey}`);
          }
          return newCorrectness;
        });

        setActiveLetterIndex((prevIndex) => prevIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLetterIndex, activeWordIndex, words]);

  return (
    <WrapWords
      words={words}
      activeWordIndex={activeWordIndex}
      activeLetterIndex={activeLetterIndex}
      correctness={correctness}
    />
  );
};

export default InputCheck;