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
              background-color: #811111;
              color: #dadadc;
          }
          
          .btn-green {
              background-color: #013220;
              color: #dadadc;
          }
          
          .btn-xxl {
              padding: .5rem 1rem;
              font-size: 1.5rem;
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
      <div>
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
      </div>
    </Fragment>
  );
}

export default Game;
