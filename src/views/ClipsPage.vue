<template>
    <div class="clips-page" :ref="dumb_counter">
        {{ dumb_counter }}
        <div class="clips_status" v-if="clips == -1">Loading</div>
        <div class="clips_status" v-else-if="!clips || !clips.length">No clips</div>
        <div class="clips_status" v-else>Clips count = {{ clips.length }}</div>

        <div class="clips_main" v-if="clips && clips.length">

            <button :onclick="async () => { await next_clip() }">NEXT</button>

            <GemboPlayer :src="config.s3_url + clips[0].video_path" :buttons="{
                remember: true,
                forget: true,
                // debug: true
            }" @i_remembered_clip="async () => { await repeat_clip(1) }"
                @i_forgot_clip="async () => { await repeat_clip(0) }" :subs="subs">


            </GemboPlayer>
        </div>

    </div>
</template>


<script setup>
import GemboPlayer from '@/components/Player/GemboPlayer.vue';
import { authFetch } from '@/scripts/auth';
import config from '@/scripts/config';
import { get_instances_to_repeat, repeat } from '@/scripts/ir_scripts';
import { load_subs } from '@/scripts/movies';
import { ref, onMounted } from 'vue';


const clips = ref(-1)
const dumb_counter = ref(-1)
const subs = ref(false)

onMounted(async () => {
    await get_clips_to_repeat()
    dumb_counter.value += 1
})


async function get_clips_to_repeat() {
    const clips_data = await get_instances_to_repeat("clips")
    if (!clips_data) {
        return []
    }
    clips_data
    const ids = []
    clips_data.data.forEach(clip => {
        ids.push(clip.instance_id)
    });
    const clips_response = await authFetch(config.clips_by_ids_url(ids))
    if (clips_response.ok) {
        const clips_json = await clips_response.json()
        if (clips_json.data && clips_json.data.length) {
            clips.value = clips_json.data
            clips.value.sort(() => Math.random() - 0.5)
            subs.value = await load_subs(clips.value[0].subs)
        }else{
            clips.value = 0
        }
    }
    else {
        clips.value = 0
    }


}

async function repeat_clip(status = true) {
    await repeat("clips", clips.value[0].id, status)
    await next_clip()
}


async function next_clip() {
    clips.value.shift()
    if (clips.value && clips.value.length) {
        subs.value = await load_subs(clips.value[0].subs)
    }
    dumb_counter.value++
}

</script>


<style scoped></style>