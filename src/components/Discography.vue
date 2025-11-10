<!-- <template>
    <div class="albums">
        <p>Альбомы</p>
        <div class="album_eclipse">
            <img src="../assets/images/discography/eclipse.png" alt="эклипс">
           
        </div>
        
    </div>
</template> -->

<!-- <template>
  <div class="albums">
    <h3>Альбомы</h3>
    
    <div class="albums">
      <div class="album_card" @click="$router.push('/album')">
        <img src="../assets/images/discography/eclipse.png" alt="обложка альбома">
        <p>ECLIPSE</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.discograph p {
  font-size: 20px;
}

.discograph h3 {
  font-size: 24px;
}

.albums {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}

.album_card {
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    cursor: pointer;
}


.album_card img {
  width: 200px;
  height: 200px;
}
</style> -->

<template>
  <div class="discography-page">
    <h1>Дискография</h1>
    
    <div v-if="loading" class="loading">Загружаем альбомы...</div>
    
    <div v-else class="albums-grid">
      <div 
        v-for="album in albums" 
        :key="album.id"
        class="album-card"
        @click="goToAlbum(album.id)"
      >
        <img :src="album.cover_url" :alt="album.title" class="album-cover">
        <div class="album-info">
          <h3>{{ album.title }}</h3>
          
          <!-- Описание альбома прямо в коде -->
          <div class="description">
            <p>Студийный альбом • 2023 год</p>
            <p>8 треков • 35 минут</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../lib/supabase'

export default {
  name: 'DiscographyPage',
  data() {
    return {
      albums: [],
      loading: true
    }
  },
  async mounted() {
    await this.loadAlbums()
  },
  methods: {
    async loadAlbums() {
      try {
        const { data: albums, error } = await supabase
          .from('albums')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        
        this.albums = albums
      } catch (error) {
        console.error('Ошибка загрузки альбомов:', error)
      } finally {
        this.loading = false
      }
    },
    
    goToAlbum(albumId) {
      // Переход на страницу альбома
      console.log('🎵 Клик на альбом с ID:', albumId)
      console.log('🔄 Пытаюсь перейти на:', `/album/${albumId}`)
      this.$router.push(`/album/${albumId}`)
    }
  }
}
</script>

<style scoped>
.discography-page {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.discography-page h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 2.5em;
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.album-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.album-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.album-cover {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.album-info {
  padding: 20px;
}

.album-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.3em;
  color: #333;
}

.description {
  color: #666;
}

.description p {
  margin: 5px 0;
  font-size: 0.9em;
  line-height: 1.4;
}

.loading {
  text-align: center;
  padding: 60px;
  font-size: 1.2em;
  color: #666;
}
</style>