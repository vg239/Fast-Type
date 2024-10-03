import React from 'react';

const WrapWords = ({ words, activeWordIndex, activeLetterIndex, correctness }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
                  <div className="text-white font-mono w-full max-w-4xl h-52 overflow-y-auto overflow-x-hidden p-4 border border-white flex flex-wrap leading-none">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className={`word ${wordIndex === activeWordIndex ? 'active-word' : ''} mr-2`}>
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
            {correctness[wordIndex] && correctness[wordIndex].length > word.length && (
              correctness[wordIndex].slice(word.length).map((extraChar, idx) => {
                console.log(`Adding incorrect-extra span: ${extraChar}`);
                return (
                  <span key={idx} className="text-red-500">
                    {extraChar}
                  </span>
                );
              })
            )}
          </span>
        ))}
      </div>
      <div className="hidden">
        {words.join(" ")}
      </div>
    </div>
  );
};

export default WrapWords;