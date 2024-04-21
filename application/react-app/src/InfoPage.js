import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function InfoPage() {
    const { searchTerm } = useParams(); // Assuming 'searchTerm' is used for navigation. Consider using a unique ID for clarity.
    const [itemDetails, setItemDetails] = useState(null);

    useEffect(() => {
        // Assuming the fetch URL is correct. Adjust if you're using an ID or another method to fetch specific details.
        //const url = `https://aquamate.me/search?search=${encodeURIComponent(searchTerm)}`;
        const url = `http://localhost:8080/search?search=$P{encodeURIComponent(searchTerm)}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Assuming the first result is the desired one. This assumption might not always be correct.
                if (data && data.length > 0) {
                    setItemDetails(data[0]);
                } else {
                    throw new Error('Item not found');
                }
            })
            .catch(error => {
                console.error('Error fetching item details:', error);
            });
    }, [searchTerm]); // Depend on searchTerm to refetch when it changes

    if (!itemDetails) return <div>Loading...</div>;

    return (
        <div>
            <h1>{itemDetails.commonName}</h1>
            <h2>{itemDetails.scientificName}</h2>
            {/* Using an <iframe> to display the image might not be ideal. Consider using an <img> tag for images. */}
            <iframe src={itemDetails.photo} width="640" height="480" frameBorder="0" scrolling="no"></iframe>
            {/* The line above is replaced with the line below for better image handling */}
            {/*<img src={itemDetails.photo} alt={`Image of ${itemDetails.commonName}`} style={{ width: '640px', height: 'auto' }} />*/}
        </div>
    );
}

export default InfoPage;
