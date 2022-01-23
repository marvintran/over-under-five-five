import React, { Fragment, useEffect, useState } from "react";
import Logo from "./Logo";

const Team = ({ team_id, full_name, short_name, logo_path }) => {
  return(
    <Fragment>
      <div>
        <Logo
          short_name={short_name}
          logo_path={logo_path}
        />
      </div>
    </Fragment>
  );
}

export default Team;
