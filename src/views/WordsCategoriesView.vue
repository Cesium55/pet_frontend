<template>

    <WordsContainer>
        <div class="words-page">
            <CategoryList :categories="categories" :ir_data="ir_categories_data"></CategoryList>
        </div>
    </WordsContainer>

</template>


<script setup>
import CategoryList from '@/components/CategoryList.vue';
import WordsContainer from '@/components/Containers/WordsContainer.vue';
import { authFetch } from '@/scripts/auth';
import config from '@/scripts/config';
import { get_categories_sub_info } from '@/scripts/ir_scripts';
import { onMounted, ref } from 'vue';

const categories = ref([])
const ir_categories_data = ref([])

onMounted(async () => {
    const response = await authFetch(config.words_categories_all_url)
    if (response.ok) {
        const response_json = await response.json()
        categories.value = response_json.data
    }
    ir_categories_data.value = await get_categories_sub_info()
})
</script>


<style scoped></style>