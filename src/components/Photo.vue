<template>
    <vue-flux
    :options="fluxOptions"
    :images="fluxImages"
    :transitions="fluxTransitions"
    ref="slider">
        <flux-pagination slot="pagination"></flux-pagination>
        <flux-controls slot="controls"></flux-controls>
        <flux-index slot="index"></flux-index>
    </vue-flux>
</template>

<script>
import { VueFlux, FluxControls, FluxIndex, Transitions } from 'vue-flux';
import axios from 'axios';

function getPhotos(comp) {
    axios.get("/gallery")
    .then((response)  =>  {
        comp.fluxImages = response.data;
    }, (error)  =>  {
        console.log("ERROR: " + error);
    });
}

function setupReload(comp) {
    var now = new Date();
    var millis = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 5, 0, 0) - now;  // Reload 5 mins after midnight
    if (millis < 0) {
        millis += 86400000;
    }
    setTimeout(() => {
        getPhotos(comp);
        setupReload(comp);
    }, millis);
}

export default {
    components: {
        VueFlux,
        FluxControls,
        FluxIndex
    },
    created: function () {
        getPhotos(this);
        setupReload(this);
    },
    data: () => ({
        fluxOptions: {
            autoplay: true,
            height: 'auto',
            infinite: true
        },
        fluxImages: [ "/resource/loading.gif", "/resource/loading.gif"],  // One single image isn't shown...
        fluxTransitions: {
            transitionKenburn: Transitions.transitionKenburn,
            transitionFade: Transitions.transitionFade,
            transitionCamera: Transitions.transitionCamera,
            transitionWarp: Transitions.transitionWarp,
            transitionBook: Transitions.transitionBook
        }
    })
}
</script>