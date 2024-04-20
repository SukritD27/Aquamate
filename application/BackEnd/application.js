require('dotenv').config()
const express = require('express');
const app = express();
const path = require("path")
const testRouter = require('./test.js');
const cardsRouter = require('./cards.js');
const galleryRouter = require('./gallery.js');
const mongoose = require('mongoose');
const db = require('./config/database.js');
const pool = require('./config/database.js');
const connectToDatabase = require('./config/database.js');
const cors = require('cors');
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 8080;
pool();


app.use('/test', testRouter);
app.use('/cards', cardsRouter);
app.use('/search', cardsRouter);
app.use('/search', cardsRouter);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const root = path.join(__dirname, '../react-app/build');
app.use(express.static(root));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../react-app/build", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;