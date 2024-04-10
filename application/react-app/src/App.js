import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './home.js';
import InfoPage from './InfoPage';
import './css/home.css';
import './css/header.css';

function App() {
    const [message, setMessage] = useState('Loading...'); // More neutral initial message

    useEffect(() => {
        fetch('http://localhost:8080/test')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setMessage(data.message))
            .catch(err => {
                console.error("Failed to fetch data from backend:", err);
                setMessage("Failed to connect to the backend.");
            });
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <p>Backend: {message}</p>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/info/:searchTerm" element={<InfoPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
