const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DB_URI);

router.get('/', async (req, res, next) => {
    try {
        await client.connect(); // Ensure the client connects to the database successfully
        const db = client.db("aquamatedb");
        const collection = db.collection('fauna');

        const images = await collection.find({}).toArray(); // Fetch all documents in the collection
        res.json(images); // Send them back to the client
    } catch (error) {
        console.error('Error accessing MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close(); // Ensure to close the client connection
    }
});

module.exports = router;