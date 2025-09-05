<template>
    <div class="movies-list" v-for="mov in movies">
        <MovieListItem :movie="mov"></MovieListItem>
    </div>
</template>


<script setup>
import MovieListItem from './MovieListItem.vue';

const props = defineProps({
    movies: {
        type: Array,
        default: []
    }
})


// protected $fillable = [
//     'title',
//     'description',
//     'language',
//     'video_path',
//     'thumb_path',
//     'is_subs_cut',
//     'video_processed',
//     'subs',
//     'clip_intervals',
// ];

</script>


<style scoped>
    
</style>