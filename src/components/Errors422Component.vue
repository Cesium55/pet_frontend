<template>
    <div class="errors-422" v-if="hasErrors">
        <div v-if="errors.message" class="errors-title">Errors:</div>

        <div v-if="errors.errors">
            <div v-for="(messages, field) in errors.errors" :key="field" v-for-item>
                <div v-for="(msg, index) in messages" :key="index">
                    - {{ msg }}
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
    errors: {
        type: Object,
        required: true,
        default: () => ({})
    }
})

const { errors } = toRefs(props)

const hasErrors = computed(() =>
    !!(errors.value.message || (errors.value.errors && Object.keys(errors.value.errors).length))
)
</script>


<style scoped></style>