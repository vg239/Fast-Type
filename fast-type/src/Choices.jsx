import React, { useState } from "react";
import InputCheckTimesVersion from "./InputCheckTimesVersion";
import InputCheckWordsVersion from "./InputCheckWordsVersion";

const Choices = () => {
  const [selection, setSelection] = useState('Time');
  const [value, setValue] = useState(15);

  const handleSelectionChange = (newSelection) => {
    setSelection(newSelection);
    setValue(newSelection === "Words" ? 50 : 15);
  };

  const handleValueChange = (event) => {
    setValue(Number(event.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-cyan-400">
      <h1 className="text-4xl font-bold mb-8">FastType</h1>
      <div className="w-full max-w-4xl">
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => handleSelectionChange('Time')}
            className={`mr-4 px-6 py-2 rounded ${selection === 'Time' ? 'bg-cyan-600 text-black' : 'bg-black text-cyan-400 border border-cyan-600'}`}
          >
            Time
          </button>
          <button
            onClick={() => handleSelectionChange('Words')}
            className={`px-6 py-2 rounded ${selection === 'Words' ? 'bg-cyan-600 text-black' : 'bg-black text-cyan-400 border border-cyan-600'}`}
          >
            Words
          </button>
        </div>

        <div className="flex justify-center mb-6">
          {selection === 'Time' ? (
            ['15', '30', '60', '120'].map((option) => (
              <label key={option} className="mx-2">
                <input
                  type="radio"
                  value={option}
                  onChange={handleValueChange}
                  checked={value === Number(option)}
                  className="mr-2"
                />
                <span className="text-lg">{option}s</span>
              </label>
            ))
          ) : (
            ['50', '100', '200', '500'].map((option) => (
              <label key={option} className="mx-2">
                <input
                  type="radio"
                  value={option}
                  onChange={handleValueChange}
                  checked={value === Number(option)}
                  className="mr-2"
                />
                <span className="text-lg">{option}</span>
              </label>
            ))
          )}
        </div>

        <div className="mt-4 relative">
          {selection === 'Time' ? (
            <InputCheckTimesVersion value={value} />
          ) : (
            <InputCheckWordsVersion value={value} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Choices;