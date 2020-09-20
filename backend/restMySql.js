const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(logger);

function logger (req, res, next) {
  console.log('request fired ' + req.url + ' ' + req.method);
  next();
}

let mysqlCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mySQLpassword",
  database: "sql_music_service",
  multipleStatements: true
});

mysqlCon.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  res.send("Hello World!")
});

app.get('/top_songs', (req, res) => {
  mysqlCon.query(`SELECT songs.id, songs.title, songs.length, artists.name AS artist,albums.name AS album, songs.track_number AS 'track number', songs.lyrics, songs.youtube_link AS 'youtube link', songs.created_at AS 'created at', songs.upload_at AS 'upload at'
  FROM sql_music_service.songs
  LEFT JOIN artists
  ON songs.artist=artists.id
  LEFT JOIN albums
  ON songs.album=albums.id
  LIMIT 20;`, (error, results, fields) => {
    if (error) {
        res.send(error.message);
        throw error;
    };
    res.send(results);
  });
});

app.get('/top_artists', (req, res) => {
  mysqlCon.query(`SELECT id, name, cover_img AS 'cover img', created_at AS 'created at', upload_at AS 'upload at'
  FROM sql_music_service.artists
  LIMIT 20`, (error, results, fields) => {
    if (error) {
        res.send(error.message);
        throw error;
    };
    res.send(results);
  });
});

app.get('/top_albums', (req, res) => {
  mysqlCon.query(`SELECT albums.id, albums.name, artists.name AS artist, albums.cover_img AS 'cover img', albums.created_at AS 'created at', albums.upload_at AS 'upload at'
  FROM sql_music_service.albums
  JOIN sql_music_service.artists
  ON albums.artist=artists.id
  LIMIT 20`, (error, results, fields) => {
    if (error) {
        res.send(error.message);
        throw error;
    };
    res.send(results);
  });
});

app.get('/top_playlists', (req, res) => {
  mysqlCon.query(`SELECT playlists.id, playlists.cover_img AS 'cover img', playlists.created_at AS 'created at', playlists.upload_at AS 'upload at', songs.title AS 'song title', songs.artist
  FROM sql_music_service.playlists
  LEFT JOIN sql_music_service.songs_in_playlists
  ON playlists.id=songs_in_playlists.playlist_id
  LEFT JOIN sql_music_service.songs
  ON songs_in_playlists.song_id=songs.id
  where playlists.id <= 20`, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.get('/song/:id', async (req, res) =>{
  mysqlCon.query(`SELECT * FROM songs WHERE id=${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.get('/artist/:id', async (req, res) => {
  mysqlCon.query(`SELECT * FROM artists WHERE id=${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.get('/album/:id', async (req, res) =>{
  mysqlCon.query(`SELECT albums.id, albums.name, artists.name AS artist, albums.cover_img, albums.created_at, albums.upload_at
  FROM sql_music_service.albums
  JOIN sql_music_service.artists
  ON albums.artist=artists.id
  WHERE albums.id=${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.get('/playlist/:id', (req, res) => {
  mysqlCon.query(`SELECT playlists.id, playlists.cover_img AS 'cover img', playlists.created_at AS 'created at', playlists.upload_at AS 'upload at', songs.title AS 'song title', songs.artist
  FROM sql_music_service.playlists
  LEFT JOIN sql_music_service.songs_in_playlists
  ON playlists.id=songs_in_playlists.playlist_id
  LEFT JOIN sql_music_service.songs
  ON songs_in_playlists.song_id=songs.id
  where playlists.id=${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.post('/song', async (req, res) =>{
  mysqlCon.query('INSERT INTO songs SET ?',req.body, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.post('/album', async (req, res) =>{
  mysqlCon.query('INSERT INTO albums SET ?',req.body, (error, results, fields) => {
    if (error) {
      res.send(error);
      throw error;
    };
    res.send(results);
  });
});

app.post('/playlist', async (req, res) =>{
  mysqlCon.query('INSERT INTO playlists SET ?',req.body, (error, results, fields) => {
    if (error) {
      res.send(error);
      throw error;
    };
    res.send(results);
  });
});

app.listen(3001);