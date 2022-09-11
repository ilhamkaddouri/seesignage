import React, { useState, useEffect } from "react";
import Playlist from "./components/Playlist.react";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import { addPlaylist, getAllPlaylists } from "./API/API";

import Header from "../common/Header/Header.react";
import { boxStyle } from "../../common/constants";

import "../../components/styles.css";
import "./dashboard.css";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addNewPlaylist = async () => {
    try {
      await addPlaylist(name);
      setName("");
      handleClose();
      window.location.reload(false);
    } catch (err) {}
  };

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

  return (
    <div className="container">
      <Header />
      <div className="body">
        <Button onClick={handleOpen} className='btn'>Add new playlist</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={boxStyle}>
              <TextField
                id="standard-basic"
                label="Playlist name"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button onClick={addNewPlaylist}>Save</Button>
          </Box>
        </Modal>
      </div>
      <div className="playlists">
        {playlists.map((playlist, key) => (
          <Playlist name={playlist.name} id={playlist.id} key={key} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
