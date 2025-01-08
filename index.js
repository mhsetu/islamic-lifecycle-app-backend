const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('get started');
});

const uri =
  'mongodb+srv://islamicLifestyleApp:qp2R1yVpbS17Xg7y@cluster0.86bsg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const categoryCollection = client
      .db('Islamic_lifestyle-app')
      .collection('category');
    const subCategoryCollection = client
      .db('Islamic_lifestyle-app')
      .collection('sub_category');
    const duaCollection = client.db('Islamic_lifestyle-app').collection('dua');

    app.get('/category', async (req, res) => {
      const query = {};
      const result = await categoryCollection.find(query).toArray();
      res.send(result);
    });

    app.get('/subCategory', async (req, res) => {
      const query = {};
      const result = await subCategoryCollection.find(query).toArray();
      res.send(result);
    });
    app.get('/duas', async (req, res) => {
      const query = {};
      const result = await duaCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`get started to ${port}`);
});
