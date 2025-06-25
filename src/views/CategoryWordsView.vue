<template>
    <div class="words-category-page">
        <div v-if="category">
            <div class="category_title">
                {{ category.name }}
            </div>

            <div class="words_list">
                <div class="word_item" v-for="word in category.words">
                    {{ word.translations[0].text }}
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { authFetch } from '@/scripts/auth';
import config from '@/scripts/config';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const category_id = route.params.category_id

const category = ref(false)

onMounted(async () => {
    const response = await authFetch(config.words_by_category_url(category_id))
    const json_data = await response.json()
    category.value = json_data.data
    console.log(json_data.data)
})

</script>


<style scoped></style>