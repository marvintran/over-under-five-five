import React, { Fragment } from "react";

import Logo from "./Logo";
import GamesList from "./GamesList";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../stylesheets/Team.css";

const Team = ({ team_id, full_name, short_name, logo_path }) => {
  return(
    <Fragment>
      <Row className="team">
        <Col className="logo" xs={12} sm={2} md={1} >
          <Logo
            short_name={short_name}
            logo_path={logo_path}
          />
        </Col>
        <Col className="gamesList" xs={12} sm={10} md={11} >
          <GamesList
            team_id={team_id}
          />
        </Col>
      </Row>
    </Fragment>
  );
}

export default Team;
