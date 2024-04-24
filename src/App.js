import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ExpenseTracker from './ExpenseTracker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ExpenseTracker" element={<ExpenseTracker />} /> {/* Added route for ExpenseTracker */}
      </Routes>
    </Router>
  );
}

export default App;
