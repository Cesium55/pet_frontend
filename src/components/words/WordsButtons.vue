<template>

    <div class="word_buttons">

        <WordButton @click="$emit('known_clicked')" :button_count_class_name="button_count_class_name + ' lb'"
            v-if="known">{{ LocalizationManager.get_string("word_know") }}<br> [←]
        </WordButton>

        <WordButton @click="$emit('remember_clicked')" :button_count_class_name="button_count_class_name + ' lb'"
            v-if="remember">{{ LocalizationManager.get_string("word_remember") }}<br>[←]</WordButton>

        <WordButton @click="$emit('example_clicked')" :button_count_class_name="button_count_class_name" v-if="example">
            {{ LocalizationManager.get_string("word_context") }} <br>[↓]</WordButton>

        <WordButton @click="$emit('show_clicked')" :button_count_class_name="button_count_class_name" v-if="show">{{
            LocalizationManager.get_string("word_translate") }}<br> [↑]</WordButton>

        <WordButton @click="$emit('repeat_clicked')" :button_count_class_name="button_count_class_name + ' rb'"
            v-if="repeat">{{ LocalizationManager.get_string("word_no_remember") }}<br>[→]
        </WordButton>

        <WordButton @click="$emit('learn_clicked')" :button_count_class_name="button_count_class_name + ' rb'"
            v-if="learn">{{ LocalizationManager.get_string("word_learn") }} <br>[→]
        </WordButton>


    </div>


</template>


<script setup>
import { ref } from 'vue';
import WordButton from './WordButton.vue';

import { LocalizationManager } from '@/utils/localization_manager';

const props = defineProps({
    learn: Boolean,
    known: Boolean,
    remember: Boolean,
    repeat: Boolean,
    example: Boolean,
    show: Boolean
})

const emits = defineEmits([
    "learn_clicked",
    "known_clicked",
    "remember_clicked",
    "repeat_clicked",
    "example_clicked",
    "show_clicked"
])


let button_count = 0;
for (var value of [
    props.learn,
    props.known,
    props.remember,
    props.repeat,
    props.example,
    props.show
]) {
    if (value) button_count++;
}
if (button_count > 4) {
    button_count = 4
    console.error("To many buttons[button_count must be <= 4]")
}

const button_count_class_name = { 1: "uno", 2: "dos", 3: "tres", 4: "quatro" }[button_count]


</script>


<style scoped>

.word_buttons {

    padding-bottom: 0.6em;

    display: flex;

    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;

}

</style>