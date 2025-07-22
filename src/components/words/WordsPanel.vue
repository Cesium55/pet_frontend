<template>
  <div class="word-card-cont">
    <div class="word-card">
      <!-- Категории -->
      <div class="categories">
        <span v-for="category in word.categories" :key="category.id" class="category-tag">
          {{ category.name }}
        </span>
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
          <div class="word-text">{{ getTranslation(lang2) }}</div>
        </div>
      </div>

      <!-- Примеры -->
      <div v-if="word.examples.length" class="examples">
        <div v-for="(example, index) in word.examples" :key="index" class="example-row">
          <div class="example left-example" v-html="getExample(example, lang1)"></div>
          <div class="example right-example" v-html="getExample(example, lang2)"></div>
        </div>
      </div>


    </div>
    <!-- Кнопки -->
    <div class="buttons">
      <WordsButtons :learn="true" :known="true" :example="true" :show="true"></WordsButtons>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatBold } from '@/utils/formaters'
import WordsButtons from './WordsButtons.vue'

const props = defineProps({
  word: Object,
  langs: Array,
})

const emits = defineEmits(
  [
    "next_word",
    "learn_clicked",
    "known_clicked",
    "remember_clicked",
    "repeat_clicked",
    "example_clicked",
    "show_clicked"
  ]
)

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
  max-height: 22em;
}


.word-card {
  border-radius: 1em;
  padding: 1em;
  margin: 0 auto;
  background-color: #fff;
  max-width: 50em;
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

.examples {
  border-top: 1px solid #eee;
  padding-top: 0.6em;
  padding-right: 1em;
  margin-top: 0.6em;
  max-height: 10em;
  overflow: scroll;
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
.buttons{
  vertical-align: bottom;
}
</style>
