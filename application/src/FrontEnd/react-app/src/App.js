import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('fail');

  useEffect(() => {
  
    fetch('http://localhost:3000/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Failed to fetch data from backend:", err));
  }, []);

  return (
    <div className="App">
      <p>Backend: {message}</p>
    </div>
  );
}

export default App;
