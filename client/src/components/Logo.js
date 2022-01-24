import React, { Fragment } from "react";
import "../stylesheets/Logo.css";

const Logo = ({ short_name, logo_path }) => {
  return(
    <Fragment>
      <div>
        <img src={logo_path} alt={short_name + " logo"}/>
        <h2 className={"header"}>{short_name}</h2>
      </div>
    </Fragment>
  );
}

export default Logo;
