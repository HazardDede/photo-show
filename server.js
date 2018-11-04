"use strict";

const express = require('express');
const cors = require('cors');
const util = require('util');

const Gallery = require('./server/Gallery');
const Playlist = require('./server/Playlist')
const Utils = require('./server/Utils');

const PORT = process.env.PORT || 8080;
const PHOTO_DIR = process.env.PHOTO_DIR || './photos';
const MUSIC_DIR = process.env.MUSIC_DIR || './music';
const CALENDAR_MODE = process.env.CALENDAR_MODE || false;

const app = express();
const gallery = CALENDAR_MODE ? new Gallery.Calendar(PHOTO_DIR) : new Gallery.Default(PHOTO_DIR);
const playlist = new Playlist(MUSIC_DIR)

app.use(cors());
app.use('/', express.static('dist'));
app.use('/photo', express.static(PHOTO_DIR));
app.use('/music', express.static(MUSIC_DIR));
app.use('/resource', express.static('static'));

app.get('/', function (req, res, next) {
  res.render("index.html");
});

app.get('/gallery', function(req, res, next) {
    const photos = Utils.forEachToArray(gallery.files(), filename => {
        // Make the local url
        return '/photo/' + filename
    });
    res.send(JSON.stringify(photos, null, 3));
});

app.get('/playlist', function(req, res, next) {
    const tracks = playlist.files('/music');
    res.send(JSON.stringify(tracks, null, 3));
});

process.on('SIGINT', function() {
    process.exit();
});

console.log(util.format("Serving directory '%s' @ '%s'", PHOTO_DIR, PORT));
app.listen(PORT);