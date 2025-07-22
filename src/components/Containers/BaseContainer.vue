<template>
    <div class="base-container">
        <div class="header">
            <Header></Header>
        </div>
        <div class="content">
            <RouterView></RouterView>
        </div>
    </div>
</template>


<script setup>
import Header from '../Header.vue';
import { RouterView } from 'vue-router';


</script>


<style scoped>
.base-container {
    display: flex;
    height: 100%;
}

.content {
    margin-top: 6em;
    width: 100%;
    padding: 1em;
    
}
</style>