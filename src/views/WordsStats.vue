<template>

    <WordsContainer>
        <div class="words-stats">
                STATS

        </div>
    </WordsContainer>
</template>


<script setup>
import WordsContainer from '@/components/Containers/WordsContainer.vue';
import { get_ir_stats } from '@/scripts/ir_scripts';
import { onMounted } from 'vue';

onMounted(async () => {
    await get_ir_stats()
})


</script>


<style scoped></style>