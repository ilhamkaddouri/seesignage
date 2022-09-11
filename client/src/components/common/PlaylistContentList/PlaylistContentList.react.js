import React, { useEffect, useState } from 'react'
import { getAllPlaylists } from '../../Dashboard/API/API';
import Playlist from '../../Dashboard/components/Playlist.react';

const PlaylistContentList = ({ }) => {
    const [playlists, setPlaylists] = useState([]);
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
    <div>
        <div className="playlists">
        { playlists.length > 0 ? playlists.map((playlist, key) => (
          <Playlist path={`/player/${playlist.id}`} name={playlist.name} id={playlist.id} key={key} />
        )) : null}
      </div>
    </div>
  )
}

export default PlaylistContentList;