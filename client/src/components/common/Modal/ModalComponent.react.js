import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { PLAYLIST_CONTENT_TYPE } from "../../../common/constants";
import { boxStyle } from "../../../common/constants";
import { addContentToPlaylist } from "../../Dashboard/API/API";

const ModalComponent = ({ playlistId, open, onClose }) => {
  const [type, setType] = useState("");
  const [url, setURL] = useState("");

  const addContentToList = async () => {
    await addContentToPlaylist({ playlistId, type, url });
    window.location.reload(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <div className="box-items">
          <FormControl style={{minWidth: 300}}>
            <InputLabel htmlFor="my-input">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="select"
              value={type}
              label="Age"
              onChange={(e) => setType(e.target.value)}
            >
              {PLAYLIST_CONTENT_TYPE.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{minWidth: 300}}>
            <InputLabel htmlFor="my-input">Url</InputLabel>
            <Input
              id="my-input"
              value={url}
              aria-describedby="my-helper-text"
              onChange={(e) => setURL(e.target.value)}
            />
          </FormControl>
          <div>
           <Button variant="contained" onClick={addContentToList}>Save</Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
