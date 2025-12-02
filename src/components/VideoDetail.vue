<template>
  <div class="video-detail">
    <button @click="goBack" class="back-btn">← Назад к видео</button>

    <div v-if="loading" class="loading">
      <p>Загрузка видео...</p>
    </div>
    
    <div v-else-if="!video" class="error">
      <p>Видео не найдено</p>
      <button @click="goBack" class="action-btn">Вернуться к списку</button>
    </div>
    
    <div v-else class="video-content">
      <div class="video-container">
        <iframe 
          :src="cleanVideoUrl(video.vk_url)"
          frameborder="0"
          allowfullscreen
          allow="autoplay; encrypted-media"
          class="video-iframe"
          :title="video.title"
        />
      </div>

      <div class="video-info">
        <h2>{{ video.title }}</h2>
        
        <div class="video-actions">
          <button @click="startMiniPlayer" class="action-btn minimize-btn">
            Свернуть в мини-плеер
          </button>
          <!-- <button @click="goBack" class="action-btn">
            ✕ Закрыть
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const route = useRoute()
const router = useRouter()
const video = ref(null)
const loading = ref(true)

// Функция очистки URL
function cleanVideoUrl(url) {
  if (!url) return ''
  let cleaned = url.toString()
  if (cleaned.startsWith('<')) cleaned = cleaned.substring(1)
  if (cleaned.endsWith('>')) cleaned = cleaned.substring(0, cleaned.length - 1)
  return cleaned.trim()
}

// Загрузка видео
async function loadVideo() {
  loading.value = true
  try {
    // Проверяем что ID есть
    if (!route.params.id) {
      console.error('Нет ID видео')
      router.push('/videos')
      return
    }

    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', route.params.id)
      .single()
    
    if (error) throw error
    
    video.value = data
    
  } catch (error) {
    console.error('Ошибка загрузки видео:', error)
    video.value = null
  } finally {
    loading.value = false
  }
}

// Назад к списку видео
function goBack() {
  router.push('/videos')
}

// Запуск мини-плеера
function startMiniPlayer() {
  if (!video.value) return
  
  const videoData = {
    ...video.value,
    vk_url: cleanVideoUrl(video.value.vk_url)
  }
  
  window.dispatchEvent(new CustomEvent('start-mini-player', {
    detail: videoData
  }))
  
  goBack()
}

onMounted(() => {
  loadVideo()
})
</script>

<style scoped>
.video-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
  min-height: 100vh;
}

.back-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
  font-weight: 600;
  font-family: "Zen_Kaku_Gothic_New";
}

.back-btn:hover {
  color: #333;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-info {
  padding: 0 10px;
}

.video-info h2 {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0 0 20px 0;
  line-height: 1.3;
  font-family: "Zen_Kaku_Gothic_New";
}

.video-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.minimize-btn {
  background: #ffffff;
  color: rgb(0, 0, 0);
}

.minimize-btn:hover {
  background: #cfcfcf;
}

.action-btn:not(.minimize-btn) {
  background: #f0f0f0;
  color: #333;
}

.action-btn:not(.minimize-btn):hover {
  background: #e0e0e0;
}

.loading, .error {
  text-align: center;
  padding: 60px 20px;
  background: #f9f9f9;
  border-radius: 12px;
  margin-top: 40px;
}

.loading p {
  font-size: 18px;
  color: #666;
}

.error p {
  font-size: 18px;
  color: #e74c3c;
  margin-bottom: 20px;
}

.error .action-btn {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

</style>