import React, { Fragment } from "react";
import Button from 'react-bootstrap/Button';

function calcGameResult(curr_team_id, home_id, home_goals, away_goals, game_result) {
  let toReturn;
  if(curr_team_id === home_id && home_goals > away_goals) {
    toReturn = "W";
  } else {
    toReturn = "L";
  }

  if(game_result === "OT") {
    toReturn = "OT " + toReturn;
  } else if(game_result === "SO") {
    toReturn = "SO " + toReturn;
  }

  return toReturn;
}

function calcGoals(home_goals, away_goals) {
  let toReturn;

  if(home_goals > away_goals) {
    toReturn = home_goals + " - " + away_goals;
  } else {
    toReturn = away_goals + " - " + home_goals;
  }

  return toReturn;
}

const Game = ({ curr_team_id, home_id, home_goals, away_goals, game_result }) => {

  const gameResult = calcGameResult(curr_team_id, home_id, home_goals, away_goals, game_result);

  const goals = calcGoals(home_goals, away_goals);

  return(
    <Fragment>
      { home_goals + away_goals > 5
        ? <Button variant="green" size="xxl" >
            <div>{gameResult}</div>
            {goals}
          </Button>
        : <Button variant="red" size="xxl" >
            <div>{gameResult}</div>
            {goals}
          </Button>
      }
    </Fragment>
  );
}

export default Game;
