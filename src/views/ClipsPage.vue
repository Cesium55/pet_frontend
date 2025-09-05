<template>
    <div class="clips-page" :ref="dumb_counter">
        {{ dumb_counter }}
        <div class="clips_status" v-if="clips == -1">Loading</div>
        <div class="clips_status" v-else-if="!clips">No clips</div>
        <div class="clips_status" v-else>Clips count = {{ clips.length }}</div>

        <div class="clips_main" v-if="clips && clips.length">

            <button :onclick="async () => {await next_clip()}">NEXT</button>

            <GemboPlayer :src="config.s3_url + clips[0].video_path">


            </GemboPlayer>
        </div>

    </div>
</template>


<script setup>
import GemboPlayer from '@/components/Player/GemboPlayer.vue';
import { authFetch } from '@/scripts/auth';
import config from '@/scripts/config';
import { ref, onMounted } from 'vue';


const clips = ref(-1)
const dumb_counter = ref(0)

onMounted(async () => {
    const response = await authFetch(config.clips_get_url(1))
    const response_data = await response.json()
    const data = response_data.data
    if (data == undefined || data == []){
        clips.value = 0
    }
    else{
        clips.value = data
    }
})


async function next_clip() {
    clips.value.shift()
    dumb_counter.value++
}

</script>


<style scoped>
    
</style>