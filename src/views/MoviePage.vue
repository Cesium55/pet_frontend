<template>
    <div class="movie-page" v-if="movie">
        <h1>{{ movie.title }}</h1>
        <GemboPlayer :src="config.s3_url + movie.video_path" :thumb-href="config.s3_url + movie.thumb_path"
            :subs="subs_ref" @wanna_add_clip="wanna_add_clip_handler" :buttons="{
                add: true,
                // remember: true,
                // forget: true
            }"></GemboPlayer>

        <br><br><br><br><br><br>
    </div>
</template>


<script setup>
import config from '@/scripts/config';
import { get_clip_by_timing, get_movie_data, load_subs } from '@/scripts/movies';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import GemboPlayer from '@/components/Player/GemboPlayer.vue';
import { start_learning } from '@/scripts/ir_scripts';

const route = useRoute()

const movie_id = route.params.movie_id

const movie = ref(false)
const subs_ref = ref(false)

async function wanna_add_clip_handler(timing) {
    const clip_data = await get_clip_by_timing(movie.value.id, timing)
    console.log(clip_data)
    if (clip_data) {
        await start_learning("clips", clip_data.id)
    }
}

onMounted(async () => {
    const response_data = await get_movie_data(movie_id)
    if (response_data) {
        movie.value = response_data
    }
    const subs = await load_subs(response_data.subs)
    subs_ref.value = subs
})

</script>

<style scoped></style>