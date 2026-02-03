<template>
  <div class="words-category-page">
    <div v-if="category">
      <div class="category_title">
        {{ category.name }}
      </div>

      <div class="words_list">
        <div 
          class="word_item" 
          v-for="word in category.words" 
          :key="word.id"
        >
          <!-- кружок -->
          <div 
            class="status-circle" 
            :class="statusColor(word)"
          ></div>

          <!-- основной текст -->
          <div class="word_info">
            <div class="word_text">
              {{ word.translations[0].text }}
            </div>

            <div v-if="word.irData" class="word_meta">
              <span class="meta">Iteration {{ word.irData.current_iteration + 1 }}</span>
              <span class="meta">
                Next repeat 
                {{ getRepeatStatus(word.irData.next_repeat_time) }}
              </span>
            </div>

            <div v-else class="word_meta">
              <span class="meta">New word</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { authFetch } from '@/scripts/auth';
import config from '@/scripts/config';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const category_id = route.params.category_id
const category = ref(false)

// корректный парсинг даты как UTC
function parseUTC(dateStr) {
  // если сервер прислал без Z, добавляем её
  if (!dateStr.endsWith("Z")) {
    return new Date(dateStr + "Z")
  }
  return new Date(dateStr)
}

// форматируем в локальное время пользователя
function formatDateLocal(dateStr) {
  const d = parseUTC(dateStr)
  return d.toLocaleString([], { 
    hour: "2-digit", 
    minute: "2-digit", 
    day: "2-digit", 
    month: "short" 
  })
}

// вычисляем статус повторения
function getRepeatStatus(nextTimeStr) {
  const now = new Date()
  const next = parseUTC(nextTimeStr)

  return next <= now ? "Now" : formatDateLocal(nextTimeStr)
}

// определяем цвет кружка слева
function statusColor(word) {
  if (!word.irData) return "pink" // новое слово
  if (word.irData.learn_status === 0) return "blue" // учится
  return "red" // на повторении
}

onMounted(async () => {
  const response = await authFetch(config.words_by_category_url(category_id))
  const json_data = await response.json()
  category.value = json_data.data

  if (response.ok) {
    const ids_arr = category.value.words.map(w => w.id)
    const ir_response = await authFetch(config.ir_get_by_ids_url("words", ids_arr))
    const ir_json = await ir_response.json()

    // строим мапу по instance_id
    const irMap = {}
    ir_json.data.forEach(item => {
      irMap[item.instance_id] = item
    })

    // вставляем irData в слова
    category.value.words = category.value.words.map(word => {
      return {
        ...word,
        irData: irMap[word.id] || null
      }
    })
  }
})
</script>



<style scoped>
.words_list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.word_item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.status-circle {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
}

.status-circle.red {
  background: #e74c3c;
}
.status-circle.blue {
  background: dodgerblue;
}
.status-circle.pink {
  background: hotpink;
}

.word_info {
  display: flex;
  flex-direction: column;
}

.word_text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.word_meta {
  font-size: 13px;
  color: #555;
  display: flex;
  gap: 10px;
}

.meta {
  background: #f3f3f3;
  padding: 2px 6px;
  border-radius: 6px;
}
</style>
