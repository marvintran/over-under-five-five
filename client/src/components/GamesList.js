import React, { Fragment, useEffect, useState } from "react";
import Game from "./Game";

const GamesList = ({ team_id }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await fetch("/api/games/"+team_id)
        const jsonData = await response.json()

        setGames(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getGames();
  }, [team_id]);

  return(
    <Fragment>
      {games.map(game => (
        <Game
          curr_team_id={team_id}
          home_id={game.home_id}
          home_goals={game.home_goals}
          away_goals={game.away_goals}
          game_result={game.game_result}
        />
      ))}
    </Fragment>
  );
}

export default GamesList;
