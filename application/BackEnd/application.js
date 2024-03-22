require('dotenv').config()
const express = require('express');
const app = express();
const testRouter = require('./test.js');
const cardsRouter = require('./cards.js');
const mongoose = require('mongoose');
const db = require('./config/database.js');
const pool = require('./config/database.js');
const connectToDatabase = require('./config/database.js');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
pool();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(cors());
app.use('/test', testRouter);
app.use('/cards', cardsRouter);
app.use('/search', cardsRouter);

module.exports = app;