import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Choices from './Choices'; // Default import
import Results from './Results';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Choices />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;