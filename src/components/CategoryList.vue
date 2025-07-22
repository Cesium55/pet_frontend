<template>
    <div class="category-list" v-for="cat in categories">
        <div class="category">
            <RouterLink :to="{ name: 'category', params: { category_id: cat.id } }">
                <div class="category_name">
                    {{ cat.name }}
                </div>
            </RouterLink>
            <div class="group_selected">
                <input type="checkbox" :id="'cat' + cat.id + 'selected'"
                    :checked="ir_data.some(x => x.id === cat.id && x.entity_id === 1)"
                    @change="onToggle($event, cat.id)" />
            </div>
        </div>
    </div>
</template>


<script setup>
import config from '@/scripts/config'
import { authFetch } from '@/scripts/auth'

const props = defineProps({
    categories: {
        type: Array,
        required: true,
        default: () => []
    },
    ir_data: {
        type: Array,
        required: true,
        default: () => []
    }
})


const onToggle = async (event, catId) => {
  const body = { id: catId, entity_type: 'words' }
  const url = `${config.interval_repeat_url}/groups/subscribe`
  const isChecked = event.target.checked

  try {
    await authFetch(url, {
      method: isChecked ? 'POST' : 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
  } catch (e) {
    console.error('Ошибка при подписке/отписке', e)
    event.target.checked = !isChecked // откат в случае ошибки
  }
}

</script>


<style scoped>
.category {
    border: 1px solid gray;
    border-radius: 1em;
    padding: 1em;
    margin: 1em;
}

.category_name {
    color: black;
    text-decoration: none;
}
</style>