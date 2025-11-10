 <template>
  <div class="album-page">
    <!-- Левая панель с альбомом и списком песен -->
    <div class="songs_panel">
      <div class="album_info">
        <img :src="album.cover_url" :alt="album.title" class="album_cover">
        <h2>{{ album.title }}</h2>
        
        <!-- Описание альбома (теперь прямо в коде) -->
        <div class="album_description">
          <p>Первый студийный альбом</p>
          <p>Выпущен в 2023 году</p>
        </div>
      </div>
      
      <!-- Индикатор загрузки -->
      <div v-if="loading" class="loading">🎵 Загружаем альбом...</div>
      
      <!-- Список песен -->
      <ul v-else class="songs_list">
        <li 
          v-for="song in songs" 
          :key="song.id"
          :class="{ active: currentSong?.id === song.id }"  
          @click="selectSong(song)"
        >
          <span class="track_number">{{ song.track_number }}</span>
          <span class="song_title">{{ song.title }}</span>
          <!-- Длительность убрана, так как мы её не используем -->
        </li>
      </ul>
    </div>

    <!-- Основная область контента с УМНЫМ фоном -->
    <div 
      class="content_area" 
      :style="{ 
        backgroundImage: currentSong 
          ? `url(${currentSong.background_url || album.cover_url})`  
          : `url(${album.cover_url})`                         
      }"
    >
      <!-- Если песня выбрана - показываем текст -->
      <div v-if="currentSong" class="lyrics_container">
        <h3>{{ currentSong.title }}</h3>
        <div class="lyrics">
          <p 
            v-for="(line, index) in currentSong.lyrics" 
            :key="index"
            class="lyric-line"
          >
            {{ line.line_text }}
          </p>
        </div>
      </div>

      <!-- Если песня НЕ выбрана - показываем обложку крупно -->
      <div v-else class="no-song-selected">
        <img :src="album.cover_url" :alt="album.title" class="large-cover">
        <p>🎵 Выберите песню для прослушивания</p>
      </div>

      <!-- Аудио плеер (показываем только когда есть песня) -->
      <div v-if="currentSong" class="audio_player">
        <audio 
          ref="audioPlayer"
          :src="currentSong.audio_url"
          controls
          @timeupdate="updateProgress"
        ></audio>
        <div class="progress_bar">
          <div 
            class="progress" 
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../lib/supabase'

export default {
  name: 'AlbumPage',
  data() {
    return {
      album: {},          // Данные альбома
      songs: [],          // Песни этого альбома
      currentSong: null,  // Текущая выбранная песня
      progress: 0,        // Прогресс воспроизведения
      loading: true       // Статус загрузки
    }
  },
  async mounted() {
    const albumId = this.$route.params.id
    console.log('Загружаем альбом с ID:', albumId)
    await this.loadAlbum(albumId)
  },
  methods: {
    // Загрузка данных альбома
    async loadAlbum(albumId) {
    try {
      this.loading = true
      console.log('🔄 Загружаем альбом ID:', albumId)
      
      // 1. Загружаем данные альбома
      const { data: album, error: albumError } = await supabase
        .from('albums')
        .select('*')
        .eq('id', albumId)
        .single()
      
      if (albumError) throw albumError
      console.log('✅ Альбом загружен:', album)
      
      // 2. Загружаем песни этого альбома (БЕЗ КОММЕНТАРИЕВ!)
      const { data: songs, error: songsError } = await supabase
        .from('songs')
        .select(`
          id,
          title,
          audio_url,
          track_number,
          background_url,
          lyrics (
            line_order, 
            line_text
          )
        `)
        .eq('album_id', albumId)
        .order('track_number')
      
      if (songsError) throw songsError
      console.log('🎵 Песни загружены:', songs)
      
      // Сохраняем данные
      this.album = album
      this.songs = songs.map(song => ({
        ...song,
        lyrics: song.lyrics?.sort((a, b) => a.line_order - b.line_order) || []
      }))
      
      // Выбираем первую песню
      if (this.songs.length > 0) {
        this.currentSong = this.songs[0]
        console.log('🎶 Текущая песня:', this.currentSong)
      }
      
    } catch (error) {
      console.error('❌ Ошибка загрузки альбома:', error)
    } finally {
      this.loading = false
      console.log('🏁 Загрузка завершена')
    }
  }
    ,
    // Выбор песни
    selectSong(song) {
      this.currentSong = song
      this.progress = 0
      
      // Пытаемся автоматически запустить воспроизведение
      this.$nextTick(() => {
        const audio = this.$refs.audioPlayer
        if (audio) {
          audio.play().catch(e => {
            console.log('Автовоспроизведение заблокировано')
          })
        }
      })
    },
    
    // Обновление прогресса воспроизведения
    updateProgress() {
      const audio = this.$refs.audioPlayer
      if (audio && audio.duration) {
        this.progress = (audio.currentTime / audio.duration) * 100
      }
    }
  }
}
</script>

<style scoped>
.album-page {
  display: flex;
  height: 100vh;
  font-family: 'Arial', sans-serif;
}

/* Панель с альбомом и песнями */
.songs_panel {
  width: 350px;
  background: #1a1a1a;
  color: white;
  padding: 20px;
  overflow-y: auto;
  border-right: 2px solid #333;
}

.album_info {
  text-align: center;
  margin-bottom: 30px;
}

.album_cover {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  margin: 0 auto 15px;
  object-fit: cover;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.album_info h2 {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #fff;
}

.album_description {
  font-size: 0.9em;
  color: #ccc;
  line-height: 1.4;
}

.album_description p {
  margin: 5px 0;
}

.songs_list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.songs_list li {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin: 5px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #333;
}

.songs_list li:hover {
  background: #333;
  transform: translateX(5px);
}

.songs_list li.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.track_number {
  width: 25px;
  color: #888;
  font-size: 0.9em;
}

.song_title {
  flex: 1;
  margin: 0 10px;
}

/* Основная область контента */
.content_area {
  flex: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: background-image 0.5s ease-in-out;
}

/* Контейнер для текста песни */
.lyrics_container {
  flex: 1;
  padding: 40px;
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(5px);
}

.lyrics_container h3 {
  font-size: 2.5em;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.lyrics {
  max-width: 600px;
  margin: 0 auto;
}

.lyric-line {
  font-size: 1.3em;
  line-height: 1.8;
  margin: 15px 0;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.lyric-line:hover {
  opacity: 1;
}

/* Состояние когда песня не выбрана */
.no-song-selected {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
}

.large-cover {
  width: 300px;
  height: 300px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.5);
  object-fit: cover;
}

.no-song-selected p {
  font-size: 1.5em;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}

/* Аудио плеер */
.audio_player {
  background: rgba(0, 0, 0, 0.9);
  padding: 20px;
  backdrop-filter: blur(10px);
}

audio {
  width: 100%;
  margin-bottom: 10px;
}

.progress_bar {
  width: 100%;
  height: 6px;
  background: #444;
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  transition: width 0.1s;
}

/* Состояния */
.loading {
  color: #60a5fa;
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
}
</style>

