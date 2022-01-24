import React, { Fragment } from "react";

import Logo from "./Logo";
import GamesList from "./GamesList";

import "../stylesheets/Team.css";

const Team = ({ team_id, full_name, short_name, logo_path }) => {
  return(
    <Fragment>
      <div className="team">
        <Logo
          short_name={short_name}
          logo_path={logo_path}
        />
        <GamesList
          team_id={team_id}
        />
      </div>
    </Fragment>
  );
}

export default Team;
