import React, { useState, useEffect } from "react";
import Header from "../common/Header/Header.react";
import { getAllPlaylists } from "../Dashboard/API/API";
import SignagePlayer from "./SignagePlayer.react";
import "../styles.css";
import './signageController.css';
import { Button } from "@mui/material";

const SignagePlayerController = () => {
  const [playlists, setPlaylists] = useState([]);
  const [isDisplayer, setIsDisplayer] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  useEffect(() => {
    const fetchPlaylists = async () => {
      const plysts = await getAllPlaylists();
      setPlaylists(plysts.data);
    };
    try {
      fetchPlaylists();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const showDisplayer = (id) => {
    console.log(id)
    setCurrentPlaylist(id);
  };

  return (
    <div>
      <Header />
      <div className="playlists">
        {playlists.map((playlist, key) => (
          <div key={key}>
            <span>{playlist.name}</span>
            <Button variant="contained" onClick={() => showDisplayer(playlist.id)}>
              Show displayer
            </Button>
          </div>
        ))}
        <div className="displayer">
          {currentPlaylist ? <SignagePlayer playlistId={currentPlaylist} /> : null}
        </div>
      </div>
    </div>
  );
};

export default SignagePlayerController;
