import React, { useState, useEffect } from "react";
import Header from "../common/Header/Header.react";
import { getContentOfPlaylist } from "../Dashboard/API/API";
import '../styles.css';
import './signagePlayer.css';

const SignagePlayer = ({ playlistId }) => {
  const [playlistContent, setPlaylistContent] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    const findPlaylist = async () => {
      const contents = await getContentOfPlaylist(playlistId);
      const images = contents.data.map(({ url }) => url);
      setPlaylistContent(contents.data);
      setImgs(images);
    };
    try {
      findPlaylist();
    } catch (err) {}
  }, [playlistId]);

  useEffect(() => {
    const intervalId = setInterval(switchImage, 7000);
    return () => clearInterval(intervalId);
  });

  const switchImage = () => {
    // const images = playlistContent.map(({ url }) => url);
    if (currentImage < imgs.length - 1) {
      setCurrentImage(currentImage + 1);
    } else {
      setCurrentImage(0);
    }
    return currentImage;
  };
  return (
    <div className="container">
      <div className="body">
        <div className="displayer">
          <h3> SignagePlayer {playlistId}</h3>
          <img
            className="img"
            src={imgs[currentImage]}
            alt="displayer images"
            width="500"
            height="600"
          />
        </div>
        {/* <video controls loop>
              <source src="movie.mp4" type="video/mp4"/>
              <source src="movie.ogg" type="video/ogg"/>
              Your browser does not support the video tag.
            </video>
        */}
      </div>
    </div>
  );
};

export default SignagePlayer;
