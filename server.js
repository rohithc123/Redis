const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Redis = require("redis");

//pass url when using it in production
// const redisClient = Redis.createClient({url:});

const redisClient = Redis.createClient();
redisClient.connect().catch(console.log);
const DEFAULT_EXPIRATION = 3600;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  console.log(albumId);

  //without redis the fetching time was around 800ms
  //after using redis cache it was reduced to mere 20ms
  try {
    const photos = await redisClient.get(`photos?albumId=${albumId}`);
    console.log("Checking Redis cache for photos");

    if (photos != null) {
      console.log("Cache hit");
      return res.json(JSON.parse(photos));
    } else {
      console.log("Cache miss");
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos`,
        { params: { albumId } }
      );

      await redisClient.setEx(
        `photos?albumId=${albumId}`,
        DEFAULT_EXPIRATION,
        JSON.stringify(data)
      );
      res.json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/photos/:id", async (req, res) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
  );
  res.json(data);
});

app.listen(8000, () => {});
