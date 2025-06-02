<template>
    <div class="words-page">
        <CategoryList :categories="categories"></CategoryList>
    </div>
</template>


<script setup>
import CategoryList from '@/components/CategoryList.vue';
import { authFetch } from '@/scripts/auth';
import config from '@/scripts/config';
import { onMounted, ref } from 'vue';

const categories = ref([])

onMounted(async ()=>{
    const response = await authFetch(config.words_categories_all_url)
    if (response.ok){
        const response_json = await response.json()
        categories.value = response_json.data
    }
})
</script>


<style scoped></style>