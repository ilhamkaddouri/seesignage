import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { cardStyle } from "../../common/constants";

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to your digital signage app</h2>
      <div className="cards">
        <Link to="/dashboard" className="link card">
          <Card sx={cardStyle}>
            <CardContent>
              <Typography className="typography" variant="body2">
                Dashboard
              </Typography>
            </CardContent>
          </Card>
        </Link>
        <Link to="/player" className="link card">
          <Card sx={cardStyle}>
            <CardContent>
              <Typography className="typography" variant="body2">
                Player
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Home;
