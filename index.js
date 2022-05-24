const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Driver Code
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b3gie.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// MongoDB CRUD Operation
async function run() {

    try {
        await client.connect();
        const toolsCollection = client.db('tools_terminal').collection('tools');
        const reviewsCollection = client.db('tools_terminal').collection('reviews');

        // Get all tools from database
        app.get('/tools', async (req, res) => {
            const query = {};
            const cursor = toolsCollection.find(query);
            const tools = await cursor.toArray();
            res.send(tools);
        })

        // Get all reviews from database
        app.get('/reviews', async (req, res) => {
            const reviews = await reviewsCollection.find().toArray();
            res.send(reviews);
        })

    }

    finally {
        // await client.close();
    }

}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Tools Terminal Server Running')
});

app.listen(port, () => {
    console.log(`Tools Terminal is running on ${port}`)
})