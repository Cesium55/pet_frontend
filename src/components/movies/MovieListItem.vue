<template>
    <RouterLink :to="{name: 'movie', params:{movie_id: movie.id}}">

        <div class="movie-list-item">
        <div class="movie-top">
            <img class="movie-item-img" :src="get_media_url(movie.thumb_path)" :alt="movie.id + ' thumb'">
        </div>
        <div class="movie-bottom">
            {{ movie.title }}
        </div>
    </div>

    </RouterLink>
</template>


<script setup>

import config from '@/scripts/config';
import { get_media_url } from '@/scripts/movies';

const props = defineProps({
    movie: {
        type: Object
    }
})

</script>


<style scoped>
.movie-list-item {
    width: 30em;
    height: 20em;
}

.movie-top {
    height: 15em;
    width: 30em;
    background-color: black;
    display: flex;
    justify-content: space-around;
}

.movie-item-img {
    max-height: 15em;
    max-width: 30em;
    
}
</style>