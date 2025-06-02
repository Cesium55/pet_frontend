<template>
    <div class="profile-page">
        <h1>{{ user_id ? "User " + user_id : "Auth error" }}</h1>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { decodeUserIdFromToken } from '@/scripts/auth';

const user_id = ref(decodeUserIdFromToken())

</script>


<style scoped></style>