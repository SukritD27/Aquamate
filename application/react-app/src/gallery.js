import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './gallery.css';

function GalleryPage() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Assuming this URL is where your images data is fetched from
        //const url = 'https://aquamate.me/cards?search=';
        const url = 'https://localhost:8080/cards?search=';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log to see the received data structure
                setImages(data);
            })
            .catch(error => {
                console.error('Error fetching gallery images:', error);
            });
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <header className="header">
                <h1>AquaMate</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/builder">Builder</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section className="gallery">
                    <h1>Our Gallery</h1>
                    <p>Discover the beauty of aquatic life captured in our gallery.</p>
                    <div className="image-gallery">
                        {images.map((image, index) => (
                            <div key={index}>
                                <div>Common Name: {image.commonName}</div>
                                <div>Scientific Name: {image.scientificName}</div>
                                <iframe src={image.photo} width="640" height="480" frameBorder="0" scrolling="no"></iframe>
                            </div>
                        ))}
                    </div>
                </section>
            </main>n

            <footer>
                <p>&copy; 2024 Aquarium Website. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default GalleryPage;