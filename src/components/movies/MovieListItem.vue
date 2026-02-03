<template>
  <RouterLink :to="{name: 'movie', params:{movie_id: movie.id}}">
    <div class="movie-list-item">
      <div class="movie-top">
        <img class="movie-item-img" :src="get_media_url(movie.thumb_path)" :alt="movie.id + ' thumb'">
      </div>
      <div class="movie-bottom">
        <span class="movie-title">{{ movie.title }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
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
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    /* transition: transform 0.25s ease, box-shadow 0.25s ease, border-bottom 0.25s ease; */
    display: flex;
    flex-direction: column;
    /* background: #111; */
    border-bottom: 4px solid white;
}

.movie-list-item:hover {
    /* transform: translateY(-5px); */
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
    border-bottom: 4px solid dodgerblue; /* синяя рамка снизу */
}

.movie-top {
    height: 15em;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    overflow: hidden;
}

.movie-item-img {
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
    /* transition: transform 0.3s ease; */
    overflow: hidden;
}

/* .movie-list-item:hover .movie-item-img {
    transform: scale(1.1);
} */

.movie-bottom {
    flex: 1;
    padding: 0.8em 1em;
    background-color: #fff;
    display: flex;
    align-items: center;
}

.movie-title {
    font-size: 1.1em;
    font-weight: 600;
    color: #111; 
    text-align: left;
    line-height: 1.3;
}
</style>
