import React from 'react';

const WrapWords = ({ words, activeWordIndex, activeLetterIndex, correctness }) => {
  return (
    <div className="bg-black text-white font-mono w-full max-w-4xl h-52 overflow-y-auto overflow-x-hidden p-4 border border-white">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className={`word ${wordIndex === activeWordIndex ? 'active-word' : ''} mr-2 mb-2 inline-block`}>
          {word.split("").map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className={
                wordIndex === activeWordIndex && letterIndex === activeLetterIndex
                  ? 'text-yellow-500'
                  : correctness[wordIndex] && correctness[wordIndex][letterIndex] === 'correct'
                  ? 'text-green-500'
                  : correctness[wordIndex] && correctness[wordIndex][letterIndex] === 'incorrect'
                  ? 'text-red-500'
                  : ''
              }
            >
              {letter}
            </span>
          ))}
          {correctness[wordIndex] && correctness[wordIndex].slice(word.length).map((item, idx) => (
            <span
              key={`extra-${idx}`}
              className="text-red-500"
            >
              {item.status === 'extra' ? item.char : ''}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default WrapWords;