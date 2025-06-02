<template>
  <div class="login-page">
    <SubmitFormComponent :serverErrors="errors" :inputs="formInputs" submitText="Login" @submit="onFormSubmit">

    </SubmitFormComponent>
  </div>
</template>


<script setup>
import config from '@/scripts/config';
import { ref } from 'vue';
import SubmitFormComponent from '@/components/SubmitFormComponent.vue';

const email = ref("")
const password = ref("")
const errors = ref([])

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
  errors.value = []
  const response = await fetch(config.login_url, {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: "include"
  })

  if(response.ok){
    window.location.reload()
  }
  else{
    if (response.status==422){
      errors.value = await response.json()
    }
  }

  console.log('Форма отправлена:', response)

}
</script>


<style scoped></style>