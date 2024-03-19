const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const client = require('./config/database.js');

router.get('/', (req, res, next) => {
    res.json({ message: " passed" }); // Send the message in an object

});

router.get('/search', async function(req, res, next) {
    const search = req.query;
    const client = new MongoClient(process.env.DB_URI);
    try {
        const db = client.db(); 
        const collection = db.collection('fauna'); 
    
        const searchResults = await collection.find({ commonName: search });

        if(await collection.countDocuments(searchResults) === 0){
            console.log("No Docs found")
        }else{
            res.json(searchResults);
        }
        for await (const doc of searchResults) {
            console.dir(doc);
        }
        
      } catch (error) {
        console.error('Error searching MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

})



module.exports = router;
