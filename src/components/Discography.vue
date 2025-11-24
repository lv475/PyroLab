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
          <!-- <div class="description">
            <p>Студийный альбом • 2023 год</p>
            <p>8 треков • 35 минут</p>
          </div> -->
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
        console.log('🔄 Начинаем загрузку альбомов...')
    
        const { data: albums, error } = await supabase
          .from('albums')
          .select('*')
          .order('created_at', { ascending: false })
        
        console.log('📊 Ответ от Supabase:', { data: albums, error })
        
        if (error) {
          console.error('❌ Ошибка Supabase:', error)
          throw error
        }

        console.log('✅ Альбомы загружены:', albums)
        
        this.albums = albums
      } catch (error) {
        console.error('Ошибка загрузки альбомов:', error)
      } finally {
        this.loading = false
        console.log('🏁 Загрузка завершена, loading:', this.loading, 'Альбомов:', this.albums.length)
      }
    },
    
    goToAlbum(albumId) {
      // Переход на страницу альбома
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
  font-size: 2.5em;
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat( 4, 1fr);
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

/* .album-info {
  padding: 10px;
} */

.album-info h3 {
  font-size: 20px;
  color: #ffffff;
  text-align: center;
}

/* .description {
  color: #666;
} */

/* .description p {
  margin: 5px 0;
  font-size: 0.9em;
  line-height: 1.4;
} */

.loading {
  text-align: center;
  padding: 60px;
  font-size: 1.2em;
  color: #666;
}
</style>