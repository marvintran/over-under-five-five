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
    const allTeams = await pool.query("SELECT * FROM teams ORDER BY short_name");
    res.json(allTeams.rows);
  } catch (err) {
    console.error(err.message)
  }
})

// get 12 games for a specific team or the next 12 games with offset
app.get("/games/:id/:offset?", async(req, res) => {
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

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
