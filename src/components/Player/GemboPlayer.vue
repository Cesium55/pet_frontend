<template>
    <button>ADD</button>
    <div class="gembo-player" ref="containerRef">

        <video ref="videoPlayer" class="video-js"></video>

    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, provide, computed, watch } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import { VolumeManager } from '@/scripts/player/volume';
import MyLabel from '../debug/MyLabel.vue';
import { TopSubLine } from '@/scripts/player/components';
import { get_clip_by_timing, SrtParser } from '@/scripts/movies';


const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    thumbHref: {
        type: String,
        default: '',
    },
    subs: {
        type: Object
    },
    buttons: {
        type: Object,
        default: {
            add: false,
            remember: false,
            forget: false
        }
    }
})


const emit = defineEmits(["wanna_add_clip", "i_remembered_clip", "i_forgot_clip", "debug_emit"])

const containerRef = ref(null)

provide('containerRef', containerRef)


const videoPlayer = ref(null)
let player = null


const srt_parser = ref(false)


async function learn_emit(emit_name) {
    emit(emit_name, player.currentTime())
}


watch(
    () => props.src,
    (newSrc) => {
        if (player && newSrc) {
            player.src({ src: newSrc, type: "video/mp4" });
            player.play();
        }
    }
);


watch(
    () => props.subs,
    (new_subs) => {
        console.log("subs watch update")
        if (player && new_subs) {
            srt_parser.value = new SrtParser(new_subs.eng, new_subs.rus)
        }
    }
);


onMounted(() => {

    // srt_parser.value =
    //     console.log(srt_parser.value)
    console.log("props.subs = " + props.subs)

    const options = {
        autoplay: true,
        controls: true,
        width: 1280,
        height: 720,
        sources: [
            {
                src: props.src,
                type: 'video/mp4'
            }
        ]
    }



    player = videojs(videoPlayer.value, options)
    const volume_manager = new VolumeManager(player)

    const top_sub_line_instance = player.addChild('TopSubLine', { text: '' });
    const bottom_sub_line = player.addChild('BottomSubLine', { text: '' });

    if (props.buttons.add) {
        const add_button = player.addChild('OverlayButton', { text: '+', style: { top: '1em', right: '1em', 'line-height': '1em' } });
        add_button.on("click", async () => learn_emit("wanna_add_clip"))
    }
    if (props.buttons.remember) {
        const remember_button = player.addChild('OverlayButton', { text: '✓', style: { top: '1em', right: '5em', 'line-height': '1em', background: 'rgba(40, 240, 40, 0.2)', background_hover: 'rgba(40, 240, 40, 0.4)', border: '1px solid rgba(40, 240, 40, 0.8)' } });
        remember_button.on("click", async () => learn_emit("i_remembered_clip"))
    }
    if (props.buttons.forget) {
        const forget_button = player.addChild('OverlayButton', { text: 'X', style: { top: '1em', right: '3em', 'line-height': '1em', background: 'rgba(240, 40, 40, 0.2)', background_hover: 'rgba(240, 40, 40, 0.4)', border: '1px solid rgba(240, 40, 40, 0.8)' } });
        forget_button.on("click", async () => learn_emit("i_forgot_clip"))
    }
    if (props.buttons.debug) {
        const forget_button = player.addChild('OverlayButton', { text: '?', style: { top: '1em', right: '7em', 'line-height': '1em', background: 'rgba(240, 240, 40, 0.2)', background_hover: 'rgba(240, 40, 40, 0.4)', border: '1px solid rgba(240, 40, 40, 0.8)' } });
        forget_button.on("click", async () => { console.log(props.subs) })
    }

    player.on('timeupdate', (e) => {
        if (srt_parser.value) {
            const current_sub = srt_parser.value.getSubtitleAt(player.currentTime())
            top_sub_line_instance.updateText(current_sub.original)
            bottom_sub_line.updateText(current_sub.translated)
        }
    })
})

onBeforeUnmount(() => {
    if (player) {
        player.dispose()
    }
})


</script>


<style>
.gembo-player {
    width: 1280px;
    height: 720px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
}

.gembo-video {
    width: 100%;
    height: 100%;
    background-color: black;
    object-fit: contain;
}

.top-player-line {
    color: red;
    font-size: 3em;
}
</style>
