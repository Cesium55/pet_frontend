<template>
  <div class="register-page">
    <SubmitFormComponent :inputs="formInputs" submitText="Register" @submit="onFormSubmit">

    </SubmitFormComponent>
  </div>
  <Errors422Component :errors="serverErrors"></Errors422Component>
</template>

<script setup>
import SubmitFormComponent from '@/components/SubmitFormComponent.vue';
import config from '@/scripts/config';
import Errors422Component from '@/components/Errors422Component.vue';
import { ref } from 'vue';
import router from '@/router';

const formInputs = [

  {
    type: 'email',
    id: 'email',
    name: 'email',
    pre_label_text: 'Email'
  },
  {
    type: 'password',
    id: 'password',
    name: 'password',
    pre_label_text: 'Password'
  },
]

const onFormSubmit = async (data) => {

  const response = await fetch(config.register_url, {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if(response.ok){
    router.push("login")
  }
  else{
    console.log(123123)
  }

  console.log('Форма отправлена:', response)

}


const serverErrors = ref({})

// Пример ошибки как от Laravel
serverErrors.value = {
  message: "The email field is required. (and 1 more error)",
  errors: {
    email: ["The email field is required."],
    password: ["The password field is required."]
  }
}
</script>

<style scoped></style>