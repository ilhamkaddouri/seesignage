import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { findPlaylistById, getContentOfPlaylist } from "../API/API";
import "../../../components/styles.css";
import "./playlistContent.css";

const Playlist = ({ name, id }) => {
  const [playlist, setPlaylist] = useState({});
  const [playlistContent, setPlaylistContent] = useState([]);

  useEffect(() => {
    const findPlaylist = async () => {
      if (id) {
        const foundPlayist = await findPlaylistById(id);
        const playlistContent = await getContentOfPlaylist(id);
        setPlaylist(foundPlayist.data);
        setPlaylistContent(playlistContent.data);
      }
    };
    try {
      findPlaylist();
    } catch (err) {}
  }, [id]);

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
