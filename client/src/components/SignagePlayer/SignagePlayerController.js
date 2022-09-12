import React, { useState, useEffect } from "react";
import Header from "../common/Header/Header.react";
import { getAllPlaylists } from "../Dashboard/API/API";
import SignagePlayer from "./SignagePlayer.react";
import "../styles.css";
import './signageController.css';
import { Button, Card } from "@mui/material";

const SignagePlayerController = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  useEffect(() => {
    const fetchPlaylists = async () => {
      try{
        const plysts = await getAllPlaylists();
        setPlaylists(plysts.data);
      } catch(err) {
        console.error(err);
      }
    };
    fetchPlaylists();
  }, []);

  const showDisplayer = (id) => {
    setCurrentPlaylist(id);
  };

  return (
    <div className="container">
      <Header />
      <div className="playlists">
        {playlists.map((playlist, key) => (
          <div key={key}>
            <p>{playlist.name}</p>
            <Button variant="contained" onClick={() => showDisplayer(playlist.id)}>
              Show displayer
            </Button>
          </div>
        ))}
      </div>
      <div className="displayer">
          {currentPlaylist ? <SignagePlayer playlistId={currentPlaylist} /> : null}
        </div>
    </div>
  );
};

export default SignagePlayerController;
