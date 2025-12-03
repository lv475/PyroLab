<template>
  <div class="video-page">
    <header class="page-header">
      <h1>Видео</h1>
    </header>

    <div v-if="loading" class="loading">
      <p>Загрузка видео...</p>
    </div>

    <div v-else-if="videos.length > 0" class="videos-grid">
      <div 
        v-for="video in videos"
        :key="video.id"
        class="video-card"
        @click="openVideo(video)"
      >
        <div class="thumbnail-container">
      <div class="thumbnail">
        <img 
          v-if="video.preview_url"
          :src="video.preview_url"
          :alt="video.title"
          class="thumbnail-img"
          loading="lazy"
        />
        <div v-else class="thumbnail-placeholder">
        </div>
        
        <div class="play-overlay">
          <div class="play-icon"></div>
        </div>
      </div>
    </div>
    
        <div class="video-info">
        <h3>{{ video.title }}</h3>
        </div>
    </div>
    </div>

    <div v-else class="no-videos">
      <p>Нет доступных видео</p>
      <button @click="loadVideos" class="action-btn">Обновить</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const videos = ref([])
const loading = ref(true)

function cleanVideoUrl(url) {
  if (!url) return ''
  let cleaned = url.toString()
  if (cleaned.startsWith('<')) cleaned = cleaned.substring(1)
  if (cleaned.endsWith('>')) cleaned = cleaned.substring(0, cleaned.length - 1)
  return cleaned.trim()
}

async function loadVideos() {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    videos.value = (data || []).map(video => ({
      ...video,
      vk_url: cleanVideoUrl(video.vk_url)
    }))
    
    console.log(`Загружено ${videos.value.length} видео`)
    
  } catch (error) {
    console.error('Ошибка загрузки видео:', error)
    videos.value = []
  } finally {
    loading.value = false
  }
}

function openVideo(video) {
  console.log('Открываю видео:', video.id, video.title)
  router.push(`/video/${video.id}`)
}

onMounted(() => {
  loadVideos()
})
</script>

<style scoped>
.video-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 40px;
  font-family: "Zen_Kaku_Gothic_New";
}

.loading {
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: #666;
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.video-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.video-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.thumbnail-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.thumbnail {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; 
  overflow: hidden;
  background: #000;
}

.thumbnail-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.play-icon {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.15); 
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border: none;
  font-size: 0;
  color: transparent;
}

.play-icon::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-top: 14px solid transparent;
  border-bottom: 14px solid transparent;
  border-left: 22px solid white;
  margin-left: 5px;
}

.video-card:hover .play-overlay {
  opacity: 1;
}

.video-card:hover .play-icon {
  background: rgba(17, 17, 17, 0.4); 
  transform: scale(1.08); 
  border-color: rgba(255, 255, 255, 0.3);
}

.video-info {
  padding: 16px;
  background: white;
  border-radius: 0 0 8px 8px;
}

.video-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  font-family: "Zen_Kaku_Gothic_New";
}

.no-videos {
  text-align: center;
  padding: 60px 20px;
  background: #f9f9f9;
  border-radius: 12px;
  margin-top: 40px;
}

.no-videos p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.action-btn {
  padding: 10px 20px;
  background: #ffffff;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}


</style>