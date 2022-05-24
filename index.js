const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Tools Terminal Server Running')
});

app.listen(port, () => {
    console.log(`Tools Terminal is running on ${port}`)
})