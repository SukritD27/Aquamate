const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const client = require('./config/database.js');
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DB_URI);
// const querystring = require('node:querystring');
const { URLSearchParams } = require('url');

// router.get('/', (req, res, next) => {
//     res.json({ message: " passed" }); // Send the message in an object

// });

router.get('/', async function(req, res, next) {
    // const searchString = req.query;
    const searchParams = new URLSearchParams(req.query);
    const searchString = searchParams.toString();   
    const parsedString = searchString.split("=");
    // const searchString = "B";
    const x = parsedString[1];
    const search = new RegExp([x].join(""), "i");
    try {
        const db = client.db("aquamatedb");
        const collection = db.collection('fauna');

        const searchResultsCursor = await collection.find({ $or : [{commonName: {$regex: search}}, {scientificName: {$regex: search}}] });
        const searchResults = await searchResultsCursor.toArray();

        if(await collection.countDocuments({ $or : [{commonName: {$regex: search}}, {scientificName: {$regex: search}}] }) === 0){
            console.log('search: ',search);
            console.log("No Docs found.");

            // returns everything if query found nothing
            const resultsCursor = await collection.find({});
            const results = await resultsCursor.toArray();
            res.json(results);
            for await (const doc of results) {
                console.dir(doc);
            }
        }else{
            console.log('searchFound: ',search);
            res.json(searchResults);
        }
        // const doc = searchResults[0];
        // console.dir(doc);
        for await (const doc of searchResults) {
            console.dir(doc);
        }

      } catch (error) {
        console.error('Error searching MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

})



module.exports = router;
