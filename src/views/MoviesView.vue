<template>
    <div class="movies-page">
        <h1>Movies</h1>
        <h2><RouterLink :to="{name: 'clips'}">Repeat page</RouterLink></h2>
        <h2 v-if="!(total_movies===false)">Total: {{ total_movies }}</h2>
        <MoviesList :movies="movies">

        </MoviesList>
    </div>
</template>


<script setup>
import { authFetch } from '@/scripts/auth';
import config from '@/scripts/config';
import { onMounted, ref } from 'vue';
import MoviesList from '@/components/movies/MoviesList.vue';

const movies = ref([])
const total_movies = ref(false)

onMounted(async () => {
    const response = await authFetch(config.media_handler_prefix + "/videos")
    if (response.ok){
        const response_data = await response.json()
        movies.value = response_data.data
        total_movies.value = response_data.total
    }
})

</script>


<style scoped>
    
</style>