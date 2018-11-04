<template>
    <div id="jukebox">
        <div class="info">Please wait...</div>
        <div class="loader">
            <div class="load-progress">
                <div class="play-progress">
                </div>
            </div>
        </div>
        <div class="controls">
            <a class="prev" href="#"><img src="resource/jukebox/previous.png" alt="Prev" /></a>
            <a class="play" href="#"><img src="resource/jukebox/play.png" alt="Play" /></a>
            <a class="pause" href="#"><img src="resource/jukebox/pause.png" alt="Pause" /></a>
            <a class="next" href="#"><img src="resource/jukebox/next.png" alt="Next" /></a>
        </div>
    </div>
</template>

<script>

import $ from "jquery";
import axios from 'axios';

function initJukebox($, jukebox, playlist, beginPlay)
{  
    // Inject audio component
    let audio = $('<audio><p>Your browser does not supported HTML 5 audio.</p></audio>');
    $(jukebox).append(audio);

    let player = audio.get(0);
    player.pos = -1;

    // Update infobar with title of first song
    $(jukebox).find('.info').html(playlist[0].title);

    // Play event
    $(jukebox).find('.play').bind('click', function(evt) {
        evt.preventDefault();
        if (player.pos < 0) {
            $(jukebox).find('.next').trigger('click');
        } else {
            player.play();
        }
    });

    // Pause event
    $(jukebox).find('.pause').bind('click', function(evt) {
        evt.preventDefault();
        player.pause();
    });

    $(jukebox).find('.next').bind('click', function(evt) {
        evt.preventDefault();
        player.pause();
        if (++player.pos == playlist.length) player.pos = 0;
        player.setAttribute('src', playlist[player.pos].url);
        $(jukebox).find('.info').html(playlist[player.pos].title);
        player.load();
    });

    $(jukebox).find('.prev').bind('click', function(evt) {
        evt.preventDefault();
        player.pause();
        if (--player.pos < 0) player.pos = playlist.length - 1;
        player.setAttribute('src', playlist[player.pos].url);
        $(jukebox).find('.info').html(playlist[player.pos].title);
        player.load();
    });

    player.addEventListener('timeupdate', function(evt) {
        let width = parseInt($(jukebox).css('width'));
        let percentPlayed = Math.round(player.currentTime / player.duration * 100);
        let barWidth = Math.ceil(percentPlayed * (width / 100));
        $(jukebox).find('.play-progress').css('width', barWidth);
    }, false);

    player.addEventListener('canplay', function(evt) {
        $(jukebox).find('.play').trigger('click');
    }, false);

    player.addEventListener('ended', function(evt) {
        $(jukebox).find('.next').trigger('click');
    }, false);

    if(beginPlay) $(jukebox).find('.play').click();
}

export default {
    created: () => {
        axios.get("/playlist")
        .then((response)  =>  {
            initJukebox($, $("#jukebox"), response.data, true);
        }, (error)  =>  {
            console.log("ERROR: " + error);
        });
    }
};

</script>

<style>
#jukebox {
    background-color:#cc0000;
    border-radius: 8px;
    -moz-border-radius:8px;
    -webkit-border-radius:8px;
    color:#fff;
    padding:8px;
    font-family:'MountainsofChristmas', Helvetica;
    font-weight:bold;
    width:260px;
    /* Above canvas right-bottom */
    position: absolute;
    right: 50px;
    bottom: 50px;
    z-index: 30000;
}
#jukebox .loader {
    border:1px solid #fff;
    height:5px;
    margin:5px 0px
}
#jukebox .load-progress {
    width:0px;
    background-color:#fff;
    height:5px;
}
#jukebox .play-progress {
    width:0px;
    background-color:#9999cc;
    height:5px;
}

#jukebox .controls {
    text-align:center;
}

#jukebox .controls a {
    display:inline-block;
    width:33px;
    height:33px;
    margin:0px 12px;
    overflow:hidden;
}

#jukebox .controls a:hover {
    background-color:#ff9900;
}
</style>
