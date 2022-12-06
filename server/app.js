const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/movies", (req, res) => {
  knex("movies")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).send(err));
});

app.post("/movies", (req, res) => {
  knex("movies")
    .insert({ title: req.body.title })
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(404).json(err));
});

app.delete("/movies/:id", (req, res) => {
  knex("movies")
    .where("id", req.params.id)
    .del()
    .then((movie) => {
      movie !== 0
        ? res.status(201).send(`Delete successful`)
        : res.status(404).send(`Delete failed`);
    });
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
