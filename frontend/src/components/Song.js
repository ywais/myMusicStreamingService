import React, { useEffect, useState } from 'react';
import RcTable from "./RcTable";
import axios from 'axios';

function Song(props) {
  const [songData, setSongData] = useState([{}]);

  useEffect(() => {
    const getSongData = async () => {
      const { data } = await axios.get(`http://localhost:3001/song/${props.match.params.id}`);
      setSongData(data);
    };
    getSongData();
  }, []);
console.log(props.match);
console.log(props.location);
console.log(props.history);
  const getEmbed = songProperties => `https://www.youtube.com/embed/${songProperties.youtubeLink?songProperties.youtubeLink.substring(17):''}`

  return (
    <div className='full fullSong'>
      <h1>Song {props.match.params.id}</h1>
      <div className='info songInfo'>
      <iframe width='560' height='315'
      src={getEmbed(songData[0])}
      frameborder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowfullscreen>
      </iframe>
        <div>
          <h2>{songData[0].title}</h2>
          <h3>{songData[0].artist}</h3>
          <p>{songData[0].album} {songData[0].trackNumber}. {songData[0].length}</p>
          <h4>Lyrics:</h4>
          <p>
            {songData[0].lyrics}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Song;