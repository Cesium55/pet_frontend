<template>
    <WordsContainer>
        <div class="words-learn">

            <div class="panel-cont" v-if="words">
                <div class="panel">
                    <WordsPanel :langs="['eng', 'rus']" :word="words[0]">

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
import { get_instances_to_learn } from '@/scripts/ir_scripts';
import { get_words_by_ids } from '@/scripts/words';
import WordsPanel from '@/components/words/WordsPanel.vue';

const words = ref(false)

onMounted(async () => {
    const ir_data = (await get_instances_to_learn("words")).data
    const ir_ids = ir_data.map(x => x.instance_id)


    const words_data = (await get_words_by_ids(ir_ids)).data
    console.log(words_data)
    words.value = words_data

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