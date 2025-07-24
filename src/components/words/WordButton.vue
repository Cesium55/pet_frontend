<template>

    <button :class="'word_button ' + button_count_class_name" @click="$emit('click')">
        <slot>¡WORD BUTTON!</slot>
    </button>

</template>


<script setup>
import { ref } from 'vue';
const props = defineProps({
    button_count_class_name: String
})

const emits = defineEmits(["click", "up", "down", "left", "right"])

</script>

<style scoped>
.uno {
    width: 100%;
}

.dos {
    width: 50%;
}

.tres {
    width: 33.3%;
}

.quatro {
    width: 25%;
}


.word_button {
    height: 100%;
    padding: 1em;
    
    display: flex;
    justify-content: center;
    align-items: center;


    background-color: inherit;
    box-shadow: none;
    border: none;


    flex-grow: 1;

    /* border-left-width: 1px;
    border-left-style: solid; */
    border-top-width: 1px;
    border-top-style: solid;

    color: #0f1014;

    border-top-color: dodgerblue;
    border-left-color: dodgerblue;
    font-size: 0.8em;
}


.word_button:hover {
    background-color: #ddd;
}

.lb {
    border-bottom-left-radius: 1em;
    border-left: none;
}

.rb {
    border-bottom-right-radius: 1em;
    border-right: none;
}
</style>