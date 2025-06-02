<template>
    <div class="test-page">
        <div>
            auth data - {{ auth_data }}
        </div>
    </div>
</template>


<script setup>
import { getAccessToken } from '@/scripts/auth';
import config from '@/scripts/config';
import { onMounted, ref } from 'vue';

const auth_data = ref(null)

onMounted(async () => {
    const response = await fetch(config.auth_url, {
        method: "post",
        headers: { "Authorization": "Bearer " + getAccessToken() }
    })

    auth_data.value = await response.json()
}
)


</script>


<style scoped></style>