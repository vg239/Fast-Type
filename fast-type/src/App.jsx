import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Choices from './Choices'; // Default import


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Choices />} />
      </Routes>
    </Router>
  );
};

export default App;