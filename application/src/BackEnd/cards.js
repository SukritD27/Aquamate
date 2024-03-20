const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const client = require('./config/database.js');
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DB_URI);
const querystring = require('node:querystring');

// router.get('/', (req, res, next) => {
//     res.json({ message: " passed" }); // Send the message in an object

// });

router.get('/search', async function(req, res, next) {
    const searchString = req.query;
    // const searchString = "B";
        const search = new RegExp(searchString);
    try {
        const db = client.db("aquamatedb");
        const collection = db.collection('fauna');

        const searchResults = await collection.find({ commonName: {$regex: search} });
        // ${search}
        if(await collection.countDocuments({ commonName: {$regex: search} }) === 0){
            console.log('search: ',search);
            console.log("No Docs found.")
        }else{
            console.log('search: ',search);
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
