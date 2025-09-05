<template>
    <div class="profile-page">
        <h1>{{ user_id ? "User " + user_id : "Auth error" }}</h1>
    </div>


    <div ref="telegramContainer"></div>

</template>


<script setup>
import { ref, onMounted } from 'vue';
import { authFetch, decodeUserIdFromToken } from '@/scripts/auth';
import config from '@/scripts/config';

const user_id = ref(decodeUserIdFromToken())

const telegramContainer = ref(null);

onMounted(() => {
  // Создаем скрипт Telegram виджета
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://telegram.org/js/telegram-widget.js?22';
  script.setAttribute('data-telegram-login', 'gembo_bot');
  script.setAttribute('data-size', 'large');
  script.setAttribute('data-onauth', 'onTelegramAuth(user)');
  script.setAttribute('data-request-access', 'write');

  // Функция авторизации
  window.onTelegramAuth = async function(user) {
    console.log(user)
    console.log(JSON.stringify(user))
    const  result = await authFetch(config.link_tg_url, {method:"POST", body:JSON.stringify(user)})

    console.log(result)
  };

  // Вставляем скрипт в контейнер
  telegramContainer.value.appendChild(script);
});


</script>


<style scoped></style>