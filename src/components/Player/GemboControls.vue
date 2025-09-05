<template>
  <div  :class="['gembo-controls', {'visible': visible}, { 'hide-cursor': !visible }]">
    <button class="fs-button" @click.stop="$emit('toggle-fullscreen')">FS</button>

    <div class="gembo-controls-bottom-line">
      asd
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, inject } from 'vue'

const visible = ref(true)
let hideTimeout = null
const containerRef = inject('containerRef')

function show() {
  visible.value = true
  clearTimeout(hideTimeout)
  hideTimeout = setTimeout(() => {
    visible.value = false
  }, 400)
}

onMounted(() => {
  containerRef?.value?.addEventListener('mousemove', show)
})
onBeforeUnmount(() => {
  containerRef?.value?.removeEventListener('mousemove', show)
  clearTimeout(hideTimeout)
})
</script>

<style scoped>
.gembo-controls {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  /* pointer-events: none; */
}

.gembo-controls.visible {
  opacity: 1;
  pointer-events: auto;
}


.fs-button {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.hide-cursor {
  cursor: none !important;
}


.gembo-controls-bottom-line{

}
</style>
