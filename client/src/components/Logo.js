import React, { Fragment } from "react";
import "../stylesheets/Logo.css";

const Logo = ({ short_name, logo_path }) => {
  return(
    <Fragment>
      <img src={logo_path} alt={short_name + " logo"}/>
      <h2 className={"header"}>{short_name}</h2>
    </Fragment>
  );
}

export default Logo;
