<template>
    <div class="category-list" v-for="cat in categories">
        <div class="category">
            {{ cat.name }}
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