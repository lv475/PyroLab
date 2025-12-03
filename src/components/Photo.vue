<template>
  <div class="photos-page">
    <div class="container">
      <h1>Фотогалерея</h1>
      
      <div class="years-filter">
        <button 
          v-for="year in availableYears" 
          :key="year"
          @click="selectYear(year)"
          :class="['year-btn', { active: selectedYear === year }]"
        >
          {{ year === 'all' ? 'Все годы' : year }}
        </button>
      </div>

      <div v-if="loading" class="loading">
        Загрузка фотографий...
      </div>

      <div v-else class="photos-grid">
        <div 
          v-for="photo in filteredPhotos" 
          :key="photo.id"
          class="photo-card"
          @click="openLightbox(photo)"
        >
          <img 
            :src="photo.image_url" 
            :alt="photo.description || `Фото ${photo.year}`"
          />
          <div class="photo-info">
            <span class="year">{{ photo.year }}</span>
            <p v-if="photo.description" class="description">
              {{ photo.description }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="selectedPhoto" class="lightbox" @click="closeLightbox">
        <div class="lightbox-content">
          <button class="close-btn" @click="closeLightbox">×</button>
          <img :src="selectedPhoto.image_url" :alt="selectedPhoto.description" />
          <div class="lightbox-info">
            <h3>{{ selectedPhoto.year }} год</h3>
            <p v-if="selectedPhoto.description">{{ selectedPhoto.description }}</p>
            <div class="lightbox-controls">
              <button @click.stop="prevPhoto">‹ Назад</button>
              <button @click.stop="nextPhoto">Вперёд ›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabase'

export default {
  name: 'PhotosPage',
  setup() {
    const photos = ref([])
    const loading = ref(true)
    const selectedYear = ref('all')
    const selectedPhoto = ref(null)
    const selectedPhotoIndex = ref(0)

    const fetchPhotos = async () => {
      try {
        loading.value = true
        const { data, error } = await supabase
          .from('gallery_photos')
          .select('*')
          .order('year', { ascending: false })
          .order('created_at', { ascending: false })

        if (error) throw error
        photos.value = data
      } catch (error) {
        console.error('Ошибка загрузки фотографий:', error)
      } finally {
        loading.value = false
      }
    }

    const availableYears = computed(() => {
      const years = [...new Set(photos.value.map(photo => photo.year))].sort((a, b) => b - a)
      return ['all', ...years]
    })

    const filteredPhotos = computed(() => {
      if (selectedYear.value === 'all') {
        return photos.value
      } else {
        return photos.value.filter(photo => photo.year === parseInt(selectedYear.value))
      }
    })

    const selectYear = (year) => {
      selectedYear.value = year
      selectedPhoto.value = null
    }

    const openLightbox = (photo) => {
      selectedPhoto.value = photo
      selectedPhotoIndex.value = filteredPhotos.value.findIndex(p => p.id === photo.id)
    }

    const closeLightbox = () => {
      selectedPhoto.value = null
    }

    const nextPhoto = () => {
      const nextIndex = (selectedPhotoIndex.value + 1) % filteredPhotos.value.length
      selectedPhoto.value = filteredPhotos.value[nextIndex]
      selectedPhotoIndex.value = nextIndex
    }

    const prevPhoto = () => {
      const prevIndex = (selectedPhotoIndex.value - 1 + filteredPhotos.value.length) % filteredPhotos.value.length
      selectedPhoto.value = filteredPhotos.value[prevIndex]
      selectedPhotoIndex.value = prevIndex
    }

    onMounted(() => {
      fetchPhotos()
    })

    return {
      photos,
      loading,
      selectedYear,
      selectedPhoto,
      availableYears,
      filteredPhotos,
      selectYear,
      openLightbox,
      closeLightbox,
      nextPhoto,
      prevPhoto
    }
  }
}
</script>

<style scoped>
.photos-page {
  padding: 20px;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0px auto;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 40px;
  font-family: "Zen_Kaku_Gothic_New";
}

.years-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.year-btn {
  padding: 8px 16px;
  border: none;
  background: white;
  color: #000000;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Zen_Kaku_Gothic_New_Bold";
}

.year-btn:hover,
.year-btn.active {
  background: #383838;
  color: white;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 40px;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.photo-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.photo-card:hover {
  transform: translateY(-5px);
}

.photo-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.photo-info {
  padding: 15px;
}

.year {
  background: #000000;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-family: "Zen_Kaku_Gothic_New";
}

.description {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.lightbox {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-content {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  gap: 20px;
  align-items: center;
}

.lightbox-content img {
  max-width: 500px;
  max-height: 500px;
  object-fit: contain;
  border-radius: 4px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-info {
  max-width: 300px;
}

.lightbox-info h3 {
  margin-bottom: 10px;
  color: #000000;
  font-family: "Zen_Kaku_Gothic_New";
}

.lightbox-info p {
  color: #666;
  margin-bottom: 15px;
}

.lightbox-controls {
  display: flex;
  gap: 10px;
}

.lightbox-controls button {
  padding: 8px 16px;
  border: 1px solid #000000;
  background: white;
  color: #000000;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Zen_Kaku_Gothic_New_Bold";
}

.lightbox-controls button:hover {
  background: #313131;
  color: white;
}
</style>