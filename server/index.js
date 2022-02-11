const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const pool = require("./db");
const path = require('path');

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

app.get("/api/teams", async(req, res) => {
  try {
    const allTeams = await pool.query("SELECT * FROM teams ORDER BY short_name");
    res.json(allTeams.rows);
  } catch (err) {
    console.error(err.message)
  }
})

// get 12 games for a specific team or the next 12 games with offset
app.get("/api/games/:id/:offset?", async(req, res) => {
  try {
    const id = req.params.id;
    const offset = req.params.offset;

    const games = await pool.query(
      "SELECT * FROM games WHERE away_id = $1 OR home_id = $1 ORDER BY game_date DESC LIMIT 12 OFFSET $2",
      [id, offset]
    );

    res.json(games.rows);
  } catch (err) {
    console.error(err.message)
  }
})

app.get("/api/game/:id", async(req, res) => {
  try {
    const id = req.params.id;

    const game = await pool.
    query(
      "SELECT * FROM games WHERE game_id = $1",
      [id]
    );

    res.json(game.rows);
  } catch (err) {
    console.error(err.message)
  }
})

app.post("/api/games", async(req, res) => {
  try {
    const date = new Date(req.body.game_date).toUTCString();// https://stackoverflow.com/a/22835394

    const newGame = await pool.query(
      "INSERT INTO games (game_id, home_id, away_id, home_goals, away_goals, game_result, game_date) VALUES( $1, $2, $3, $4, $5, $6, $7)",
      [req.body.game_id, req.body.home_id, req.body.away_id, req.body.home_goals, req.body.away_goals, req.body.game_result, date]
    );

    res.json(newGame);
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});