const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cwntn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const Breakfast = client.db("food").collection("breakfast");
    const Launch = client.db("food").collection("launch");
    const Dinner = client.db("food").collection("dinner");
    const allFoodCart = client.db("food").collection("cart");

    app.get("/breakfast", async (req, res) => {
      const result = await Breakfast.find({}).toArray();
      res.send(result);
    });

    app.get("/breakfast/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await Breakfast.findOne(query);
      res.send(result);
    });

    app.get("/launch", async (req, res) => {
      const result = await Launch.find({}).toArray();
      res.send(result);
    });
    app.get("/launch/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await Launch.findOne(query);
      res.send(result);
    });
    app.get("/dinner", async (req, res) => {
      const result = await Dinner.find({}).toArray();
      res.send(result);
    });
    app.get("/dinner/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await Dinner.findOne(query);
      res.send(result);
    });

    //All Cart
    app.post("/cart", async (req, res) => {
      const food = req.body;
      const result = await allFoodCart.insertOne({ ...food });

      res.send(result);
    });

    app.get("/cart", async (req, res) => {
      const result = await allFoodCart.find({}).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello this is my onion site");
});
app.listen(port, () => {
  console.log(port, "Example server host side");
});
