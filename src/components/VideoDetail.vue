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

      <div class="info-card">
        <div class="info-header">
          <h2>{{ video.title }}</h2>
          <button @click="startMiniPlayer" class="mini-player-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 7H10V9H9V10H7V7ZM14 7H17V10H15V9H14V7ZM7 14H9V15H10V17H7V14ZM14 14H17V17H14V15H15V14H14Z"/>
            </svg>
            Мини-плеер
          </button>
        </div>

        <div v-if="video.description" class="info-description">
          <h3>Описание</h3>
          <p>{{ video.description }}</p>
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

function cleanVideoUrl(url) {
  if (!url) return ''
  let cleaned = url.toString()
  if (cleaned.startsWith('<')) cleaned = cleaned.substring(1)
  if (cleaned.endsWith('>')) cleaned = cleaned.substring(0, cleaned.length - 1)
  return cleaned.trim()
}

async function loadVideo() {
  loading.value = true
  try {
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

function goBack() {
  router.push('/videos')
}

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
  font-family: "Zen_Kaku_Gothic_New";
  color: #646464;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 10px 0;
  transition: transform 0.3s ease;
}

.back-btn:hover {
  color: #333;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; 
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 25px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.info-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 20px;
}

.info-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.3;
  font-family: "Zen_Kaku_Gothic_New";
  flex: 1;
  min-width: 300px;
}

.mini-player-btn {
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.mini-player-btn:hover {
  background: #d6d6d6;
  border-color: #b3b3b3;
  transform: translateY(-1px);
}

.mini-player-btn svg {
  width: 18px;
  height: 18px;
}

.info-description {
  background: #e9e9e9;
  padding: 20px 24px;
  border-radius: 8px;
  border-left: 4px solid #292929;
}

.info-description h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
  font-family: "Zen_Kaku_Gothic_New";
}

.info-description p {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin: 0;
  white-space: pre-line;
}

.loading, .error {
  text-align: center;
  padding: 60px 20px;
  border-radius: 12px;
  margin-top: 40px;
}

.loading p {
  font-size: 18px;
  color: #666;
}

.error p {
  font-size: 18px;
  color: #6b1e15;
  margin-bottom: 20px;
}


</style>