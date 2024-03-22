import React, { useState } from 'react';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const url = `http://localhost:8080/search?search=${encodeURIComponent(searchTerm)}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSearchResults(data);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        console.log(searchTerm);
        console.log(searchResults);
      });
  };

  return (
    <div>
      <header className="header">
        <h1>AquaMate</h1>
        <nav>
          <ul>
            <li><a href="../html/About/about.html">About Us</a></li>
            <li><a href="../html/Tank Builder/builder.html">Tank Builder</a></li>
            <li><a href="../html/Gallery/gallery.html">Gallery</a></li>
            <li><a href="#">Plant Profiles</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <h1>Welcome to Our Aquarium World</h1>
          <p>Discover the beauty of aquatic life and create your own underwater paradise.</p>
          <div className="search-bar">
            <input type="text" id="searchInput" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." />
            <button type="button" id="searchButton" onClick={handleSearch}>🔍</button>
          </div>
          <div className="actions">
            <div className="action" id="build-aquarium">
              <h2>Build an Aquarium</h2>
            </div>
            <div className="action" id="view-gallery">
              <h2>View Gallery</h2>
            </div>
          </div>
        </section>

        <section id="search-results" className="search-results">
          {searchResults.map((result, index) => (
            <div>
                <iframe src={result.photo} width="640" height="480" frameBorder="0" scrolling="no"></iframe>
                <div key={index}>{result.commonName}</div>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Aquarium Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
