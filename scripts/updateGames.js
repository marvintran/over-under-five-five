import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const baseUrl = process.env.APP_URL || "http://localhost:5000";

async function addGamesToDatabase(hockeyGames) {
  for(let i = 0; i < hockeyGames.length; i++) {
    const currGame = hockeyGames[i];

    const response = await fetch(baseUrl+"/api/games", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currGame)})

    //const status = response.status;
    //console.log("status: " + status);
  }
}

async function getGames(gameIDs) {
  const games = [];

  //          key, value
  for (const [gameID, gameDate] of gameIDs.entries()) {
    const response = await fetch("https://statsapi.web.nhl.com/api/v1/game/"+gameID+"/linescore");
    const data = await response.json();

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
  }

  return games;
}

async function seenGame(gameID) {
  const response = await fetch(baseUrl+"/api/game/"+gameID);
  const data = await response.json();

  return Object.keys(data).length !== 0;
}

async function getGameIDs() {
  const gamesMap = new Map();

  const today = new Date();
  const todayFormatted = today.toISOString().substr(0, 10);

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const twoDaysAgoFormatted = today.toISOString().substr(0, 10);

  const response = await fetch('https://statsapi.web.nhl.com/api/v1/schedule?startDate='+twoDaysAgoFormatted+'&endDate='+todayFormatted);
  const data = await response.json();

  const datesList = data['dates'];

  for(let i = 0; i < datesList.length; i++) {
    const currDate = datesList[i];

    const gameDate = currDate['date'];

    const gamesList = currDate['games'];
    for(let j = 0; j < gamesList.length; j++) {
      const currGame = gamesList[j];

      let state = currGame.status.detailedState;
      let gameID = currGame.gamePk;

      if(state === 'Final' && !await seenGame(gameID)) {
        gamesMap.set(gameID, gameDate);

      }
    }
  }

  return gamesMap;
}

async function updateGames() {
  const gameIDs = await getGameIDs();// returns Map<gameID, gameDate>
  const hockeyGames = await getGames(gameIDs);// returns array of objects
  await addGamesToDatabase(hockeyGames);
}

updateGames();// run using node .\updateGames.js
