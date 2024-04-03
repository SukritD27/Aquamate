import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './home.js';
import './css/home.css';
import './css/header.css';


function App() {
  const [message, setMessage] = useState('fail');

  useEffect(() => {
  
    fetch('http://localhost:8080/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Failed to fetch data from backend:", err));
  }, []);

  return (
    <div>
        <div className="App">
          <p>Backend: {message}</p>
        </div>

      <BrowserRouter>
      <div>
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
