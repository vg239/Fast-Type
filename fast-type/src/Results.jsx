import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { grossWPM, netWPM } = location.state;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Typing Test Results</h1>
        <p className="text-xl mb-2">Gross WPM: <span className="font-bold text-green-600">{grossWPM}</span></p>
        <p className="text-xl">Net WPM: <span className="font-bold text-blue-600">{netWPM}</span></p>
      </div>
    </div>
  );
};

export default Results;