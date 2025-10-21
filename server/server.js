const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// other Imports
const router = require('./config/mainRoute.js');

const app = express();
app.use(cors());
app.use(express.json());

//main Route
app.use('/', router);

// Test route
app.get('/', (req, res) => {
    res.send('Theatron Backend Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
