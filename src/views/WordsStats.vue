<template>
    <WordsContainer>
        <h1>Words learning stats</h1>
        <div class="container" v-if="stats">

            
            <div v-for="(item, key) in stats" :key="key" class="item">
                <div class="circle" :style="{ backgroundColor: colors[item.label] }"></div>
                <span class="label">{{ item.label }}</span>
                <span class="count">{{ item.count }}</span>
            </div>
        </div>
    </WordsContainer>
</template>

<script setup>
import WordsContainer from '@/components/Containers/WordsContainer.vue';
import { get_ir_stats } from '@/scripts/ir_scripts';
import { onMounted, ref } from 'vue';

const stats = ref(false);
const colors = ref({
    "FORGOT_LAST_TIME": "#e74c3c",
    "REPEATING": "dodgerblue",
    "KNOWN": "gray",
    "LEARNED": "forestgreen",
})

onMounted(async () => {
    const stats_response = await get_ir_stats();
    if (stats_response) {
        stats.value = stats_response.data.words;
    }
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 400px;
    /* ограничиваем ширину блока */
    margin: 0 auto;
    /* центрируем блок */
    padding: 12px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background-color 0.2s;
}

.item:hover {
    background-color: rgba(18, 49, 35, 0.05);
}

.circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 12px;
}

.label {
    font-weight: 500;
    font-size: 14px;
    flex-grow: 1;
    /* занимает оставшееся место */
}

.count {
    font-weight: bold;
    font-size: 14px;
    margin-left: 12px;
}
</style>
