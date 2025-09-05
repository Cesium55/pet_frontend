<template>
    <div class="my-label">
        {{ props.text ?? "asd" }}
    </div>
</template>


<script setup>
const props = defineProps(["text"])
</script>


<style scoped>
.my-label {
    color: rgb(255, 80, 255);
}
</style>