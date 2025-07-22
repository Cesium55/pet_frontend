<template>
  <div class="header-component" :key="user_id">
    <div class="header-cont">
        <div class="header-left">
            <div class="main-title">GEMBO</div>
        </div>
        <div class="header-right">
            <div class="navigation">
                <div class="nav-item"><RouterLink :to="{name:'home'}">Home</RouterLink></div>
                <div class="nav-item"><RouterLink :to="{name:'about'}">About</RouterLink></div>
                <div class="nav-item"><RouterLink :to="{name:'words'}">Words</RouterLink></div>
                <div class="nav-item"><RouterLink :to="{name:'movies'}">Movies</RouterLink></div>
                <div class="nav-item" v-if="!user_id"><RouterLink :to="{name:'login'}">Login</RouterLink></div>
                <div class="nav-item" v-if="!user_id"><RouterLink :to="{name:'register'}">Register</RouterLink></div>
                <div class="nav-item" v-if="user_id"><RouterLink :to="{name:'profile'}">Profile</RouterLink></div>
                
                <div class="nav-item" v-if="user_id"><Button :onclick="logout_handler">Logout</Button></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import { logout } from '@/scripts/auth';
import { decodeUserIdFromToken } from '@/scripts/auth';
import { ref } from 'vue';

const user_id = ref(decodeUserIdFromToken())


    
const logout_handler = async (e) => {
    await logout()
    user_id.value=null
    router.push({name:"login"})
}



</script>

<style scoped>
.header-component{
    position: fixed;
    width: 100%;
}
</style>