import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../../../components/styles.css";
import "./playlistContent.css";

const Playlist = ({ name, id }) => {
  return (
    <Fragment>
      <Link to={`/player/${id}`} className="link">
        <Card
          sx={{
            width: 200,
            height: 100,
            background: '#D3D3D3'
          }}
        >
          <CardContent className="card">
            <Typography variant="body2" className="text">{name}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Fragment>
  );
};

export default Playlist;
