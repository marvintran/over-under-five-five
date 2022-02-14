const pool = require("./db");
require('dotenv').config();
const axios = require('axios');

async function updateOverUnderCount() {
  console.log("Updating over under count");

  const allTeams = await pool.query("SELECT * FROM teams ORDER BY short_name");
  const teamRows = allTeams.rows;

  for (let i = 0; i < teamRows.length; i++) {
    const currTeam = teamRows[i];
    const currTeamID = currTeam.team_id;

    const games = await pool.query(
      "SELECT * FROM games WHERE away_id = $1 OR home_id = $1 ORDER BY game_date DESC LIMIT 12",
      [currTeamID]
    );
    const gameRows = games.rows;

    let count = 0;

    for (let j = 0; j < gameRows.length; j++) {
      const homeGoals = gameRows[j].home_goals;
      const awayGoals = gameRows[j].away_goals;

      if(homeGoals + awayGoals > 5) {
        count++;
      } else {
        break;
      }
    }

    const updateOverUnder = await pool.query(
      "UPDATE teams SET over_under_count = $1 WHERE team_id = $2",
      [count, currTeamID]
    );
  }
}

async function addGamesToDatabase(hockeyGames) {
  for(let i = 0; i < hockeyGames.length; i++) {
    const currGame = hockeyGames[i];

    const date = new Date(currGame.game_date).toUTCString();// https://stackoverflow.com/a/22835394

    const newGame = await pool.query(
      "INSERT INTO games (game_id, home_id, away_id, home_goals, away_goals, game_result, game_date) VALUES( $1, $2, $3, $4, $5, $6, $7)",
      [currGame.game_id, currGame.home_id, currGame.away_id, currGame.home_goals, currGame.away_goals, currGame.game_result, date]
    );
  }
}

async function getGames(gameIDs) {
  console.log("Getting Games from ID's");

  const games = [];

  //          key, value
  for (const [gameID, gameDate] of gameIDs.entries()) {
    await axios.get('https://statsapi.web.nhl.com/api/v1/game/'+gameID+'/linescore')
      .then(async function (response) {
        const data = response.data;

        const homeID = data.teams.home.team.id;
        const homeGoals = data.teams.home.goals;

        const awayID = data.teams.away.team.id;
        const awayGoals = data.teams.away.goals;

        const gameResult = data.currentPeriodOrdinal;

        const hockeyGame = {
          game_id: gameID,
          home_id: homeID,
          away_id: awayID,
          home_goals: homeGoals,
          away_goals: awayGoals,
          game_result: gameResult,
          game_date: gameDate+'Z'
        }

        games.push(hockeyGame);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return games;
}

async function seenGame(gameID) {
  const game = await pool.
  query(
    "SELECT * FROM games WHERE game_id = $1",
    [gameID]
  );

  return game.rowCount !== 0;
}

async function getGameIDs() {
  console.log("Getting Game ID's");

  const gamesMap = new Map();

  const today = new Date();
  const todayFormatted = today.toISOString().substr(0, 10);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayFormatted = today.toISOString().substr(0, 10);

  await axios.get('https://statsapi.web.nhl.com/api/v1/schedule?startDate='+yesterdayFormatted+'&endDate='+todayFormatted)
    .then(async function (response) {
      const data = response.data;

      const datesList = data['dates'];

      for (let i = 0; i < datesList.length; i++) {
        const currDate = datesList[i];

        const gameDate = currDate['date'];

        const gamesList = currDate['games'];
        for (let j = 0; j < gamesList.length; j++) {
          const currGame = gamesList[j];

          let state = currGame.status.detailedState;
          let gameID = currGame.gamePk;

          if (state === 'Final' && !await seenGame(gameID)) {
            gamesMap.set(gameID, gameDate);
          }
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return gamesMap;
}

async function updateGames() {
  const gameIDs = await getGameIDs();// returns Map<gameID, gameDate>
  const hockeyGames = await getGames(gameIDs);// returns array of objects

  if(hockeyGames.length > 0) {
    console.log("Adding " + hockeyGames.length + " new games");
    await addGamesToDatabase(hockeyGames);
  } else {
    console.log("No new games");
  }
  await updateOverUnderCount();
}

updateGames();// run using node .\updateGames.js
