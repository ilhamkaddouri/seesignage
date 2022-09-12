import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/DeleteSharp";
import ListItemText from "@mui/material/ListItemText";

import {
  findPlaylistById,
  getContentOfPlaylist,
  deleteContentOfPlaylist,
} from "../API/API";
import "../../styles.css";
import "./playlistContent.css";

import { OPERATIONS } from "../../../common/constants";
import ModalComponent from "../../common/Modal/ModalComponent.react";
import Header from "../../common/Header/Header.react";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const PlaylistContent = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState({});
  const [playlistContent, setPlaylistContent] = useState([]);
  const [open, setOpen] = useState(false);
  const [secondary] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const findPlaylist = async () => {
      try{
        if (id) {
          const foundPlayist = await findPlaylistById(id);
          const playlistContent = await getContentOfPlaylist(id);
          setPlaylist(foundPlayist.data);
          setPlaylistContent(playlistContent.data);
        }
      } catch(err) {
        console.error(err);
      }
    };
    findPlaylist();
  }, [id]);

  const deleteContent = async (contentId) => {
    await deleteContentOfPlaylist(id, contentId);
    window.location.reload(false);
  };

  return (
    <div className="container">
      <Header/>
      <div className="body">
      <div className="playlist-content-header">
        <p>
          Playlist name : {playlist.name}
        </p>
        <div>
          <Button onClick={handleOpen}>Add new content</Button>
          <ModalComponent actionType={OPERATIONS.CREATE} open={open} onClose={handleClose} playlistId={id}/>
        </div>
      </div>
        <Grid item>
          <Typography variant="h6" className="text" component="div">
            List of playlist content
          </Typography>
          <Demo>
            <List>
              {playlistContent.map((item, key) => (
                <ListItem
                  key={key}
                  className='list-item'
                  secondaryAction={
                    <Fragment>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteContent(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Fragment>
                  }
                >
                  <ListItemText
                    primary={item.url}
                    secondary={secondary ? "Secondary text" : null}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </div>
      
    </div>
  );
};

export default PlaylistContent;
