require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// health
app.get('/', (req, res) => res.json({ok: true}));

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;

mongoose
    .connect(MONGO, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => console.log(`Server ${PORT}`));
    })
    .catch((err) => console.error('mongo err', err));
