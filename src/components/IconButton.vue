<script setup>
const emits=defineEmits(["click"])
</script>


<template>


        <button class="icon_btn" @click="$emit('click')">
            <slot>ICON</slot>
        </button>


</template>


<style scoped>


</style>