const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Redis = require("redis");

//pass url when using it in production
// const redisClient = Redis.createClient({url:});

const redisClient = Redis.createClient();
redisClient.connect().catch(console.error);
const DEFAULT_EXPIRATION = 3600;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos`,
    { params: { albumId } }
  );

  redisClient.set("photos", JSON.stringify(data), "EX", DEFAULT_EXPIRATION);
  res.json(data);
});

app.get("/photos/:id", async (req, res) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
  );
  res.json(data);
});

app.listen(8000, () => {});
