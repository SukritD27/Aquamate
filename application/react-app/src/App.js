import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './home.js';
import GalleryPage from './gallery';
import InfoPage from './InfoPage';
import BuilderTool from './builder_tool';
import './home.css';
import './header.css';
import './builder_tool.css';
import './gallery.css';

function App() {
    const [message, setMessage] = useState('loading');

    useEffect(() => {
       // fetch('https://aquamate.me/test')
        fetch(`https://livehost:8080/test`)
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
        <div>
            <div className="App">
                <p>Backend: {message}</p>
            </div>

            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/gallery" element={<GalleryPage />} />
                        <Route path="/buildtool" element={<BuilderTool />} />
                        <Route path="/info/:searchTerm" element={<InfoPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
