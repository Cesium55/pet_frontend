<template>
    <WordsContainer>
        <div class="words-learn">

            <div class="panel-cont" v-if="words">
                 + {{ words.length }}
                <div class="panel">
                    <WordsPanel :new_word="false" :langs="['eng', 'rus']" :word="word"
                        @forgot_clicked="async () => await handle_repeat(false)"
                        @remember_clicked="async () => await handle_repeat(true)">
                        {{ no_word_description }}
                    </WordsPanel>
                </div>
            </div>

        </div>
    </WordsContainer>
</template>


<script setup>
import WordsContainer from '@/components/Containers/WordsContainer.vue';
import config from '@/scripts/config';
import { authFetch } from '@/scripts/auth';
import { onMounted, ref } from 'vue';
import { get_instances_to_repeat, repeat, get_next_repeat_description } from '@/scripts/ir_scripts';
import { get_words_by_ids } from '@/scripts/words';
import WordsPanel from '@/components/words/WordsPanel.vue';

const word = ref(false)
const no_word_description = ref("NTR")
let words = []


async function handle_repeat(remembered_status) {
    const result = await repeat('words', word.value.id, remembered_status)
    await next_word()
}

async function get_new_words() {
    const ir_data = (await get_instances_to_repeat("words")).data
    if (ir_data.length) {
        const ir_ids = ir_data.map(x => x.instance_id)

        const words_data = (await get_words_by_ids(ir_ids)).data
        ir_data.forEach(element => {
            if (words.length && words[0].id == element.instance_id) { }
            words.push({
                    ...words_data.find(x => x.id == element.instance_id),
                    ...element
                })
        });
    }
    else {
        no_word_description.value = await get_next_repeat_description("words")
    }
}

async function next_word() {
    word.value = words.shift()
    if (words.length < 2) {
        console.log("GOT NEW WORDS")
        await get_new_words()
    }
}

onMounted(async () => {
    await get_new_words()
    await next_word()

})
</script>


<style scoped>
.words-learn {
    height: 100%;
}

.panel-cont {
    vertical-align: middle;
    height: 100%;

    position: relative;
    width: 100%;
}

.panel {
    position: absolute;
    top: 40%;
    left: 45%;
    transform: translate(-50%, -50%);

}
</style>