import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Playlist(props) {
  const [playlistData, setPlaylistData] = useState([{}]);

  useEffect(() => {
    const getPlaylistData = async () => {
      const { data } = await axios.get(`http://localhost:3001/playlist/${props.match.params.id}`);
      setPlaylistData(data);
    };
    getPlaylistData();
  }, []);

  const songsTable = (songs) => songs.map((song) => (
    `${song.songTitle} - ${song.artistName} ${song.length}. `
  ));

  return (
    <div className="full fullPlaylist">
      <h1>Playlist {props.match.params.id}</h1>
      <div className='info playlistInfo'>
        <img src={playlistData[0].coverImg} alt={playlistData[0].name} className='squareImg'/>
        <div>
          <h3>{playlistData[0].name}</h3>
          <p>{playlistData[0].createdAt}</p>
        </div>
      </div>
      <div className='songsTable'>
        {songsTable(playlistData)}
      </div>
    </div>
  );
}

export default Playlist;