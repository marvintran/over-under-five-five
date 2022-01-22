const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

app.get("/teams", async(req, res) => {
  try {
    const allTeams = await pool.query("SELECT * FROM teams");
    res.json(allTeams.rows);
  } catch (err) {
    console.error(err.message)
  }
})

app.get("/games", async(req, res) => {
  try {
    const allGames = await pool.query("SELECT * FROM games");
    res.json(allGames.rows);
  } catch (err) {
    console.error(err.message)
  }
})

// get the most recent 9 games from a specific team
app.get("/games/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const game = await pool.query("SELECT * FROM games WHERE away_id = $1 OR home_id = $1 ORDER BY game_date LIMIT 9", [
      id
    ]);

    res.json(game.rows);
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
