import React, { useEffect, useState } from 'react';
import RcTable from './RcTable';
import axios from 'axios';

function Album(props) {
  const [albumData, setAlbumData] = useState([{}]);

  useEffect(() => {
    const getAlbumData = async () => {
      const { data } = await axios.get(`http://localhost:3001/album/${props.match.params.id}`);
      setAlbumData(data);
    };
    getAlbumData();
  }, []);

  const songsArray = (songs) => songs.map((song) => (
    {Title: song.songTitle, Artist: song.artist, Length: song.length}
  ));

  return (
    <div className='full fullAlbum'>
      <h1>Album {props.match.params.id}</h1>
      <div className='info albumInfo'>
        <img src={albumData[0].coverImg} alt={albumData[0].name} className='squareImg'/>
        <div>
          <h2>{albumData[0].name}</h2>
          <p>{albumData[0].artist}</p>
        </div>
      </div>
      <div className='songsTable'>
        <h4>Songs</h4>
        <RcTable songs={songsArray(albumData)} type='album'/>
      </div>
    </div>
  );
}

export default Album;