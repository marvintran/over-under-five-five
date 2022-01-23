import React, { Fragment, useEffect, useState } from "react";
import "../stylesheets/Team.css";

const Team = ({ team_id, full_name, short_name, logo_path }) => {
  return(
    <Fragment>
      <div>
        <img src={logo_path} alt={short_name + " logo"}/>
        <h2>{short_name}</h2>
      </div>
    </Fragment>
  );
}

export default Team;
