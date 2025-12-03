<template>
  <div 
    v-if="currentVideo"
    class="mini-player"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
  >
    <div class="player-header" @mousedown="startDrag">
      <span class="video-title">{{ currentVideo.title }}</span>
      <div class="player-controls">
        <button @click="expandVideo" class="control-btn" title="Развернуть">
          ⛶
        </button>
        <button @click="close" class="control-btn close-btn" title="Закрыть">
          ✕
        </button>
      </div>
    </div>
    
    <iframe 
      :src="cleanVideoUrl(currentVideo.vk_url)"
      frameborder="0"
      allowfullscreen
      allow="autoplay; encrypted-media"
      class="player-iframe"
      :title="currentVideo.title"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentVideo = ref(null)
const position = ref({ x: 20, y: 20 })
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

function cleanVideoUrl(url) {
  if (!url) return ''
  let cleaned = url.toString()
  if (cleaned.startsWith('<')) cleaned = cleaned.substring(1)
  if (cleaned.endsWith('>')) cleaned = cleaned.substring(0, cleaned.length - 1)
  return cleaned.trim()
}

function startDrag(e) {
  isDragging.value = true
  dragOffset.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y
  }
  
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(e) {
  if (!isDragging.value) return
  
  position.value = {
    x: e.clientX - dragOffset.value.x,
    y: e.clientY - dragOffset.value.y
  }
  
  const maxX = window.innerWidth - 320
  const maxY = window.innerHeight - 220
  
  position.value.x = Math.max(10, Math.min(position.value.x, maxX))
  position.value.y = Math.max(10, Math.min(position.value.y, maxY))
}

function stopDrag() {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function expandVideo() {
  if (!currentVideo.value) return
  router.push(`/video/${currentVideo.value.id}`)
  close()
}

function close() {
  currentVideo.value = null
}

function handleMiniPlayerStart(event) {
  currentVideo.value = event.detail
}

onMounted(() => {
  window.addEventListener('start-mini-player', handleMiniPlayerStart)
})

onUnmounted(() => {
  window.removeEventListener('start-mini-player', handleMiniPlayerStart)
})
</script>

<style scoped>
.mini-player {
  position: fixed;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 10999;
  overflow: hidden;
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  background: #2c2c2c;
  color: white;
  cursor: move;
  user-select: none;
}

.video-title {
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  font-family: "Zen_Kaku_Gothic_New";
}

.player-controls {
  display: flex;
  gap: 8px;
  margin-left: 10px;
}

.control-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 4px;
  transition: background 0.2s;
}

.control-btn:hover {
  background: rgba(0, 0, 0, 0.2);
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
}

.player-iframe {
  width: 100%;
  height: 100%;
  display: block;
  border: none;
}
</style>