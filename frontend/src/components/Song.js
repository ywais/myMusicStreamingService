import React, { useEffect, useState } from 'react';
import RcTable from './RcTable';
import qs from 'qs';
import axios from 'axios';

function Song(props) {
  const [songData, setSongData] = useState([{}]);
  const paersedQuery = qs.parse(props.location.search, { ignoreQueryPrefix: true });
console.log(songData);
  useEffect(() => {
    const getSongData = async () => {
      const { data } = await axios.get(`http://localhost:3001/song/${props.match.params.id}?${Object.keys(paersedQuery)[0]}=${paersedQuery[Object.keys(paersedQuery)[0]]}`);
      setSongData(data);
    };
    getSongData();
  }, []);

  const getEmbed = songProperties => `https://www.youtube.com/embed/${songProperties.youtubeLink?songProperties.youtubeLink.substring(17):''}`

  const songsArray = (songs) => songs.map((song) => (
    {Title: song.title, Artist: song.artist, Length: song.length}
  ));

  return (
    <div className='full fullSong'>
      <h1>Song {props.match.params.id}</h1>
      <section className={songData.length > 1 ? 'split' : 'noSplit'}>
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
            <p>{songData[0].lyrics}</p>
          </div>
        </div>
        {songData.length > 1 ?
          <div className='songsTable'>
            <h4>More Songs</h4>
            <RcTable songs={songsArray(songData[1])} type={Object.keys(paersedQuery)[0]}/>
          </div>
        : ''}
      </section>
    </div>
  );
}

export default Song;