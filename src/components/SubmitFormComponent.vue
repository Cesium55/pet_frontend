<template>
    <div class="submit-form">
        <Errors422Component :errors="serverErrors"></Errors422Component>
        <form @submit.prevent="handleSubmit">
            <div v-for="input in inputs" :key="input.id" class="input-line">
                <label v-if="input.pre_label_text"  :for="input.id" class="left-label">
                    {{ input.pre_label_text }}
                </label>
                <input v-bind="inputAttrs(input)" v-model="formData[input.name]" />
                <label v-if="input.post_label_text" :for="input.id" class="right-label">
                    {{ input.post_label_text }}
                </label>
            </div>
            <button class="submit-button" type="submit">
                {{ submitText }}
            </button>
        </form>
    </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { defineProps, defineEmits } from 'vue'
import Errors422Component from './Errors422Component.vue'

const props = defineProps({
    inputs: {
        type: Array,
        required: true,
        default: () => [],
    },
    submitText: {
        type: String,
        default: 'Submit',
    },
    serverErrors: {
        type: Array,
        required: true,
        default: () => [],
    },
})

const emit = defineEmits(['submit'])

const formData = reactive({})

props.inputs.forEach(input => {
    formData[input.name] = ''
})

function inputAttrs(input) {
    return {
        type: input.type || 'text',
        id: input.id,
        name: input.name,
        required: true,
    }
}

function handleSubmit() {
    emit('submit', { ...formData })
}
</script>

<style scoped>
/* При необходимости добавь стили */
</style>
