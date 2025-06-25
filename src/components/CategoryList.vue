<template>
    <div class="category-list" v-for="cat in categories">
        <div class="category">
            <RouterLink :to="{name:'category', params: {category_id: cat.id}}">
                {{ cat.name }}
            </RouterLink>
        </div>
    </div>
</template>


<script setup>
const props = defineProps({
    categories: {
        type: Array,
        required: true,
        default: () => []
    }
})
</script>


<style scoped></style>