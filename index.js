const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;


//middleware 
app.use(cors())

const tasks = [
    {id: 1, name: "Meeting"},
    {id: 2, name: "Dating"},
    {id: 1, name: "Chatting"},
]

app.get('/', (req, res)=>{
    res.send('ManageMe server is running')
});
app.get('/task', (req, res)=>{
    res.send(tasks)
});

///////////////////////////


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nekc4yh.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    app.get('/user', (req, res)=>{
        res.send('Hello I am a user')
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

///////////////////////////

app.listen(port, ()=>{
    console.log(`Server is running on PORT : ${port}`);
})