import React, { Fragment, useEffect, useState  } from "react";
import './App.css';

import Container from 'react-bootstrap/Container';

// components
import Team from "./components/Team";

const App = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await fetch("/api/teams")
        const jsonData = await response.json()

        setTeams(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getTeams();
  }, []);

  return (
    <Fragment>
      <Container className="App">
        {teams.map(team => (
          <Team
            team_id={team.team_id}
            full_name={team.full_name}
            short_name={team.short_name}
            logo_path={team.logo_path}
          />
        ))}
      </Container>
    </Fragment>
  );
}

export default App;
