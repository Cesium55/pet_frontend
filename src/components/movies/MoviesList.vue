<template>
  <div class="movies-list">
    <MovieListItem 
      v-for="mov in movies" 
      :key="mov.id" 
      :movie="mov" 
    />
  </div>
</template>

<script setup>
import MovieListItem from './MovieListItem.vue';

const props = defineProps({
  movies: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.movies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: flex-start; 
  padding: 1em;
}

/* .movies-list > * {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.4s ease forwards;
}

.movies-list > *:nth-child(1) { animation-delay: 0.05s; }
.movies-list > *:nth-child(2) { animation-delay: 0.1s; }
.movies-list > *:nth-child(3) { animation-delay: 0.15s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
} */
</style>
