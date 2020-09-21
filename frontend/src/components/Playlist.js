import React, { useEffect, useState } from 'react';
import RcTable from "./RcTable";
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

  const songsArray = (songs) => songs.map((song) => (
    {Title: song.songTitle, Artist: song.artistName, Length: song.length}
  ));

  return (
    <div className="full fullPlaylist">
      <h1>Playlist {props.match.params.id}</h1>
      <div className='info playlistInfo'>
        <img src={playlistData[0].coverImg} alt={playlistData[0].name} className='squareImg'/>
        <div>
          <h2>{playlistData[0].name}</h2>
          <p>{playlistData[0].createdAt}</p>
        </div>
      </div>
      <div className='songsTable'>
        <h4>Songs</h4>
        <RcTable songs={songsArray(playlistData)}/>
      </div>
    </div>
  );
}

export default Playlist;