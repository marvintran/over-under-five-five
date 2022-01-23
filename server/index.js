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

// get 9 games for a specific team or the next 9 games with offset
app.get("/games/:id/:offset?", async(req, res) => {
  try {
    const id = req.params.id;
    const offset = req.params.offset;

    const game = await pool.
    query(
      "SELECT * FROM games WHERE away_id = $1 OR home_id = $1 ORDER BY game_date LIMIT 9 OFFSET $2",
      [id, offset]
    );

    res.json(game.rows);
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
