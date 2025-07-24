<template>
  <div class="no_word" v-if="!word">
    <slot>NO WORD SORRY</slot>
  </div>
  <div class="word-card-cont" v-if="word">
    <div class="word-card">
      <!-- Категории -->
      <div class="top_info">
        <div class="categories">
          <span v-for="category in word.categories" :key="category.id" class="category-tag">
            {{ category.name }}
          </span>
        </div>
        <div v-if="word.user_id" :class="'categories repeat_status ' + (word.learn_status != 0 ? 'red' : 'dodgerblue')">
          <div class="category-tag">Repeating word</div>
          <div class="category-tag">Iteration {{ word.current_iteration + 1 }}</div>
        </div>
        <div class="categories repeat_status pink" v-if="!word.user_id">
          <div class="category-tag">New word</div>
        </div>

      </div>

      <!-- Переводы слова -->
      <div class="translations">
        <div class="side left">
          <div class="word-text">{{ getTranslation(lang1) }}</div>
          <div v-if="word.transcription" class="transcription">
            [{{ word.transcription }}]
          </div>
        </div>
        <div class="side right">
          <div v-if="states == 0" class="word-text">{{ getTranslation(lang2) }}</div>
        </div>
      </div>

      <!-- Примеры -->

      <div class="examples">
        <div class="examples_cont" v-if="word.examples.length && (states < 2)" >
          <div v-for="(example, index) in word.examples" :key="index" class="example-row">
            <div class="example left-example" v-html="getExample(example, lang1)"></div>
            <div v-if="states == 0" class="example right-example" v-html="getExample(example, lang2)"></div>
          </div>
        </div>
        <div class="examples_cont" v-else>
          
        </div>
      </div>


    </div>
    <!-- Кнопки -->
    <div class="buttons">
      <WordsButtons :learn="new_word" :remember="!new_word" :known="new_word" :forgot="!new_word" :example="states == 2"
        :show="states > 0" @next_word="$emit('next_word')" @learn_clicked="$emit('learn_clicked')"
        @known_clicked="$emit('known_clicked')" @remember_clicked="$emit('remember_clicked')"
        @forgot_clicked="$emit('forgot_clicked')" @example_clicked="$emit('example_clicked'); states = 1"
        @show_clicked="$emit('show_clicked'); states = 0"></WordsButtons>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { formatBold } from '@/utils/formaters'
import WordsButtons from './WordsButtons.vue'

const props = defineProps({
  word: Object,
  new_word: {
    type: Boolean,
    default: true
  },
  langs: Array,
  state: {
    type: Number,
    default: 2
  },
  ir_data: {
    type: Object
  }
})


const states = ref(props.state)



watch(
  () => props.word,
  (newVal, oldVal) => {
    states.value = props.state
  }
)

const emits = defineEmits(
  [
    "next_word",
    "learn_clicked",
    "known_clicked",
    "remember_clicked",
    "forgot_clicked",
    "example_clicked",
    "show_clicked"
  ]
)


// states
// 0 - all show
// 1 - examples and 1 lang
// 2 - only 1 lang

const lang1 = computed(() => props.langs[0])
const lang2 = computed(() => props.langs[1])

const getTranslation = (langCode) => {
  const translation = props.word.translations.find(
    (t) => t.language.code === langCode
  )
  return translation ? translation.text : '[нет перевода]'
}

const formatExampleText = (text) => {
  return text.replace(/#(.*?)#/g, '<span class="example_highlight">$1</span>')
}

const getExample = (example, langCode) => {
  const translation = example.translations.find(
    (t) => t.language.code === langCode
  )
  return translation ? formatExampleText(translation.text) : ''
}
</script>

<style scoped>
.word-card-cont {
  border: 1px solid #ddd;
  border-radius: 1em;
  margin: 0 auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  font-family: sans-serif;
  width: 40em;
  /* max-height: 22em; */
}


.word-card {
  border-radius: 1em;
  padding: 1em;
  margin: 0 auto;
  background-color: #fff;
  max-width: 50em;
}

.top_info {
  display: flex;
  justify-content: space-between;
}

.repeat_info {
  display: flex;
  justify-content: right;
}

.categories {
  margin-bottom: 1em;
}

.category-tag {
  display: inline-block;
  background-color: #f0f0f0;
  color: #555;
  padding: 0.25em 0.5em;
  border-radius: 0.5em;
  margin-right: 0.5em;
  font-size: 0.8em;
}

.translations {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}

.side {
  width: 48%;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.word-text {
  font-size: 1.5em;
  font-weight: bold;
}

.transcription {
  font-size: 0.8em;
  color: #888;
  margin-top: 0.25em;
}

.examples_cont {
  height: 10em;
}

.examples {
  border-top: 1px solid #eee;
  padding-top: 0.6em;
  padding-right: 1em;
  margin-top: 0.6em;
  max-height: 10em;
  overflow: scroll;
  height: 10em;
}

.example-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.example {
  width: 48%;
  font-size: 1em;
  color: #333;
  margin-top: 0.5em;
}

.left-example {
  text-align: left;
}

.right-example {
  text-align: right;
}

.buttons {
  vertical-align: bottom;
}


.repeat_description {
  color: gray;
  font-size: 0.9em;
}

.repeat_status::after {
  content: '';
  display: inline-block;
  position: relative;
  top: 0.2em;
  left: 0.2em;
  width: 1em;
  height: 1em;
  -moz-border-radius: 7.5px;
  -webkit-border-radius: 7.5px;
  border-radius: 7.5px;
}

.pink::after {
  background-color: rgb(255, 0, 255);
}

.dodgerblue::after {
  background-color: dodgerblue;
}

.red::after {
  background-color: red;
}
</style>
