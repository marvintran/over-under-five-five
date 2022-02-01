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
      <style type="text/css">
        {`
          .btn-red {
              background-color: #861c1c;
              color: #dadadc;
              border-radius: 10px;
              box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
              border: 1px solid #373d48
          }
          
          .btn-green {
              background-color: #023321;
              color: #dadadc;
              border-radius: 10px;
              box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
              border: 1px solid #373d48
          }
          
          .btn-xxl {
              min-width: 76.7px;
              font-size: 1.3rem;
              margin: 10px;
          }
          
          .btn:focus {
              color: yellow;
          }
          
          .btn:hover {
              color: yellow;
          }
        `}
      </style>
      { home_goals + away_goals > 5
        ? <Button variant="green" size="xxl" className={"green-btn"}>
            <div>{gameResult}</div>
            {goals}
          </Button>
        : <Button variant="red" size="xxl" className={"red-btn"}>
            <div>{gameResult}</div>
            {goals}
          </Button>
      }
    </Fragment>
  );
}

export default Game;
