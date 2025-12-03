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
      this.$router.push(`/album/${albumId}`)
    }
  }
}
</script>

<style scoped>
.discography-page {
  padding: 40px;
  max-width: 1016px;
  margin: 0 auto;
}

.discography-page h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 40px;
  font-family: "Zen_Kaku_Gothic_New";
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 75px;
}

.album-card {
  align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 254px;
}

.album-card:hover {
  transform: translateY(-5px);
}

.album-cover {
  max-width: 200px;
  height: 200px;
  align-items: center;
  margin-bottom: 10px;
}

.album-info h3 {
  font-size: 20px;
  color: #ffffff;
  text-align: center;
}

.loading {
  text-align: center;
  padding: 60px;
  font-size: 16px;
  color: #666;
}
</style>