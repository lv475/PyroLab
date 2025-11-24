<template>
  <div class="album-page" :style="albumStyles">
    <!-- ДОБАВЬ ЭТОТ ЭЛЕМЕНТ - ФОН НА ВЕСЬ ЭКРАН -->
    <div 
      class="full_background" 
      :style="{ 
        backgroundImage: currentSong 
          ? `url(${currentSong.background_url || album.cover_url})`  
          : `url(${album.cover_url})`                         
      }"
    ></div>

    <!-- Левая панель с альбомом и списком песен (остаётся без изменений) -->
    <div class="songs_panel">
      <div class="album_info">
        <img :src="album.cover_url" :alt="album.title" class="album_cover">
        <h2>{{ album.title }}</h2>
        
        <div class="album_description">
          <p>3 июля 2018</p>
        </div>
      </div>
      
      <div v-if="loading" class="loading">Загружаем альбом...</div>
      
      <ul v-else class="songs_list">
        <li 
          v-for="song in songs" 
          :key="song.id"
          :class="{ active: currentSong?.id === song.id }"  
          @click="selectSong(song)"
        >
          <span class="track_number">{{ song.track_number }}</span>
          <span class="song_title">{{ song.title }}</span>
        </li>
      </ul>
    </div>

    <!-- Основная область контента (УБЕРИ backgroundImage отсюда) -->
    <div class="content_area">
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
        <p>Выберите песню для прослушивания</p>
      </div>

      <!-- Аудио плеер -->
      <!-- <div v-if="currentSong" class="audio-player">
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
      </div> -->
      <AudioPlayer 
        v-if="currentSong" 
        :src="currentSong.audio_url" 
        class="audio-player"
      />
    </div>
  </div>
</template>

<script>
import { supabase } from '../lib/supabase'
import AudioPlayer from './AudioPlayer.vue'

export default {
  name: 'AlbumPage',
  components: {  // ← Этот блок ДОЛЖЕН быть
    AudioPlayer
  },
  data() {
    return {
      album: {},          // Данные альбома
      songs: [],          // Песни этого альбома
      currentSong: null,  // Текущая выбранная песня
      // progress: 0,        // Прогресс воспроизведения
      loading: true,      // Статус загрузки
      
      // База данных альбомов с цветами
      albumsData: [
        {
          id: 2,
          name: 'ECLIPSE',
          primaryColor: '#365976',
          secondaryColor: '#FFFFFF',
          textColor: 'white'
        },
        {
          id: 1,
          name: 'геометрия тьмы',
          primaryColor: '#474B5A',
          secondaryColor: '#2D2927',
          textColor: 'white'
        },
        
        // Добавь другие альбомы по мере необходимости
      ]
    }
  },
  computed: {
    // Динамические стили для альбома
    albumStyles() {
      const albumColors = this.getAlbumColors(this.album.id)

       if (!albumColors) {
      // Если альбом не найден в базе цветов - тоже используй серый
      return {
        '--album-primary': '#4a4a4a',
        '--album-secondary': '#2a2a2a', 
        '--album-text': 'white',
        '--album-primary-rgb': '129, 129, 129',
        '--album-secondary-rgb': '29, 29, 29'
      }
    }
      if (!albumColors) return {}

      const primaryRgb = this.hexToRgb(albumColors.primaryColor)
      const secondaryRgb = this.hexToRgb(albumColors.secondaryColor)
      
      return {
        '--album-primary': albumColors.primaryColor,
        '--album-secondary': albumColors.secondaryColor,
        '--album-text': albumColors.textColor,
        '--album-primary-rgb': `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`,
        '--album-secondary-rgb': `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`
      }
    }
  },
  async mounted() {
    const albumId = parseInt(this.$route.params.id)
    console.log('Загружаем альбом с ID:', albumId)
    await this.loadAlbum(albumId)
  },
  methods: {
    hexToRgb(hex) {
      if (!hex) return { r: 129, g: 129, b: 129 }
      
      // Убираем # если есть
      hex = hex.replace('#', '')
      
      // Преобразуем hex в rgb
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      
      return { r, g, b }
    },

    // Получение цветов для альбома
    getAlbumColors(albumId) {
      return this.albumsData.find(album => album.id === albumId)
    },
    
    // Загрузка данных альбома
    async loadAlbum(albumId) {
      try {
        this.loading = true
        
        // 1. Загружаем данные альбома
        const { data: album, error: albumError } = await supabase
          .from('albums')
          .select('*')
          .eq('id', albumId)
          .single()
        
        if (albumError) throw albumError
        
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
        
        // Сохраняем данные
        this.album = album
        this.songs = songs.map(song => ({
          ...song,
          lyrics: song.lyrics?.sort((a, b) => a.line_order - b.line_order) || []
        }))
        
      } catch (error) {
        console.error('Ошибка загрузки альбома:', error)
      } finally {
        this.loading = false
      }
    },
    
    // Выбор песни
    selectSong(song) {
      this.currentSong = song
      // this.progress = 0
    },
    
    // Обновление прогресса воспроизведения
    // updateProgress() {
    //   const audio = this.$refs.audioPlayer
    //   if (audio && audio.duration) {
    //     this.progress = (audio.currentTime / audio.duration) * 100
    //   }
    // }
  }
}
</script>

<style scoped>


.album-page {
  display: flex;
  /* width: 1440px;
  height: 100%; */
  width: 1440px; /* ← Занять всю доступную ширину */
  height: 100%; /* ← На весь экран */
  font-family: "Zen_Kaku_Gothic_New";
  position: relative; /* Только для внутреннего позиционирования */
  padding: 0;
  left: -140px;
}



/* Панель с альбомом и песнями - ТЕПЕРЬ С ДИНАМИЧЕСКИМИ ЦВЕТАМИ */
.songs_panel {
  width: 350px;
  color: var(--album-text, white); /* Динамический цвет текста */
  padding: 20px;
  overflow-y: auto;
  border-right: 2px solid #333;
  background: rgba(0, 0, 0, 0.6);
  /* background: linear-gradient(
    to bottom, */
    /* var(--album-primary, #818181) 0%,
    var(--album-secondary, #1d1d1d) 75% */
    /* rgba(var(--album-primary-rgb, 129, 129, 129), 0.2) 0%,
    rgba(var(--album-secondary-rgb, 29, 29, 29), 0.2) 75%
  ); */
  position: relative; /* Поверх фона */
  z-index: 1;
}

.songs_panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    var(--album-primary, #365976) 0%,
    var(--album-secondary, #FFFFFF) 75%
  );
  opacity: 0.7; /* Прозрачность ТОЛЬКО для фона */
  z-index: -1;
  pointer-events: none;
}

.full_background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  z-index: 0;
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
  color: var(--album-text, #fff); /* Динамический цвет */
}

.album_description {
  font-size: 0.9em;
  color: var(--album-text, #ffffff); /* Динамический цвет */
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
  color: var(--album-text, white); /* Динамический цвет */
}

.songs_list li:hover {
  background: var(--album-primary, #365976); /* Динамический цвет */
  transform: translateX(5px);
}

.songs_list li.active {
  background: var(--album-primary, #365976); /* Динамический цвет */
  color: var(--album-text, white); /* Динамический цвет */
}

.track_number {
  width: 25px;
  color: rgba(255, 255, 255, 0.7); /* Полупрозрачный белый */
  font-size: 0.9em;
}

/* Для альбомов с тёмным текстом меняем цвет номера трека */
:root {
  --album-primary: #365976;
  --album-secondary: #FFFFFF;
  --album-text: white;
}

/* Основная область контента */
.content_area {
  flex: 1;
  /* background-size: cover;
  background-position: center; */
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  min-width: 0;
  /* transition: background-image 0.5s ease-in-out; */
}

/* Контейнер для текста песни */

.lyrics {
  max-width: 100%; /* ← Убери фиксированную ширину */
  margin: 0; /* ← Убери auto */
  column-count: 2;
  column-gap: 62px;
  text-align: left;
  padding: 40px 40px;
  background: rgba(0, 0, 0, 0.7);
}

.lyrics_container {
  flex: 1;
  color: white;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* backdrop-filter: blur(5px); */
  margin: 0 auto;
  width: 100%; /* ← Адаптивная ширина */
  max-width: 900px; /* ← Максимум, но не больше экрана */
  box-sizing: border-box;
  margin-left: 35px;
  height: 100%;
}

.lyrics_container h3 {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}


.lyric-line {
  font-size: 16px;
  line-height: 25px;
  margin: 0;
  opacity: 0.9;
  text-align: left;
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
  height: 1800px;
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
.audio-player {
  background: rgba(0, 0, 0, 0.9);
  padding: 20px;
  backdrop-filter: blur(10px);
  margin-top: auto;
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
  background: linear-gradient(90deg, #6e6e6e, #1d1d1d);
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