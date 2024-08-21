// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SessionTester from './components/SessionTester';
import ChatTester from './components/ChatTester';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/session" element={<SessionTester />} />
      <Route path="/chat" element={<ChatTester />} />
      <Route path="/" element={<SessionTester />} />
    </Routes>
  </Router>
);

export default App;
