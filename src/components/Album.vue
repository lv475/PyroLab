<template>
  <div class="album-page" :style="albumStyles">
    <div 
      class="full_background" 
      :style="{ 
        backgroundImage: `url(${album.cover_url})`                          
      }"
    ></div>

    <div class="songs_panel">
      <div class="album_info">
        <img :src="album.cover_url" :alt="album.title" class="album_cover">
        <h2>{{ album.title }}</h2>
        
        <div class="album_description">
          <p>{{ album.description || getDefaultAlbumDescription() }}</p>
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

    <div class="content_area">
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

      <div v-else class="no-song-selected">
        <img :src="album.cover_url" :alt="album.title" class="large-cover">
        <p>{{ album.description || getDefaultAlbumDescription() || 'Выберите песню для прослушивания' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../lib/supabase'
import { useAudioPlayerStore } from '../stores/audioPlayer'

export default {
  name: 'AlbumPage',
  setup() {
    const audioStore = useAudioPlayerStore()
    return {
      audioStore
    }
  },
  data() {
    return {
      currentSongIndex: 0,
      album: {},
      songs: [],
      currentSong: null,
      loading: true,
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
        {
          id: 3,
          name: 'Терновый венец эволюции',
          primaryColor: '#000000',
          secondaryColor: '#FFFFFF',
          textColor: 'white'
        },
        {
          id: 4,
          name: 'mea maxima culpa',
          primaryColor: '#C0B6AC',
          secondaryColor: '#2E0809',
          textColor: 'white'
        },
      ]
    }
  },
  computed: {
    albumStyles() {
      const albumColors = this.getAlbumColors(this.album.id)
      if (!albumColors) {
        return {
          '--album-primary': '#4a4a4a',
          '--album-secondary': '#2a2a2a',
          '--album-text': 'white',
          '--album-primary-rgb': '129, 129, 129',
          '--album-secondary-rgb': '29, 29, 29'
        }
      }
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
    await this.loadAlbum(albumId)
    
    // Слушаем окончание трека
    setTimeout(() => {
      const audioElement = document.querySelector('audio')
      if (audioElement) {
        audioElement.addEventListener('ended', () => {
          if (this.currentSongIndex !== null && 
              this.currentSongIndex < this.songs.length - 1) {
            const nextIndex = this.currentSongIndex + 1
            const nextSong = this.songs[nextIndex]
            this.selectSong(nextSong)
          }
        })
      }
    }, 1000)
  },
  methods: {
    onTrackChange(newIndex) {
      this.currentSongIndex = newIndex
      this.selectSong(this.songs[newIndex])
    },
    
    selectSong(song) {
      this.currentSong = song
      this.currentSongIndex = this.songs.findIndex(s => s.id === song.id)
      this.audioStore.setCurrentTrack(song, this.songs, this.currentSongIndex)
      
      
    },
    
    hexToRgb(hex) {
      if (!hex) return { r: 129, g: 129, b: 129 }
      hex = hex.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      return { r, g, b }
    },
    
    getAlbumColors(albumId) {
      return this.albumsData.find(album => album.id === albumId)
    },
    
    getDefaultAlbumDescription() {
      return 'Описание альбома будет добавлено позже.'
    },
    
    async loadAlbum(albumId) {
      try {
        this.loading = true
        const { data: album, error: albumError } = await supabase
          .from('albums')
          .select('*')
          .eq('id', albumId)
          .single()
        if (albumError) throw albumError
        const { data: songs, error: songsError } = await supabase
          .from('songs')
          .select(`
            id,
            title,
            audio_url,
            track_number,
            lyrics (
              line_order,
              line_text
            )
          `)
          .eq('album_id', albumId)
          .order('track_number')
        if (songsError) throw songsError
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
    }
  }
}
</script>

<style scoped>
.album-page {
  display: flex;
  width: 1440px;
  height: 100%;
  font-family: "Zen_Kaku_Gothic_New";
  position: relative;
  padding: 0px;
  left: -140px;
}

.songs_panel {
  width: 350px;
  color: var(--album-text, white);
  padding: 20px;
  overflow-y: auto;
  border-right: 2px solid #333;
  background: rgba(0, 0, 0, 0.6);
  position: relative;
  z-index: 1;
}

.songs_panel::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: linear-gradient(
    to bottom,
    var(--album-primary, #365976) 0%,
    var(--album-secondary, #FFFFFF) 75%
  );
  opacity: 0.7;
  z-index: -1;
  pointer-events: none;
}

.full_background {
  position: absolute;
  top: 0px;
  left: 0px;
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
  margin: 0px auto 15px;
  object-fit: cover;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.3);
}

.album_info h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: var(--album-text, #fff);
}

.album_description {
  font-size: 14px;
  color: var(--album-text, #ffffff);
  line-height: 1.4;
  padding: 0px 10px;
}

.album_description p {
  margin: 8px 0px;
}

.songs_list {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

.songs_list li {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin: 5px 0px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--album-text, white);
}

.songs_list li:hover {
  background: var(--album-primary, #365976);
  transform: translateX(5px);
}

.songs_list li.active {
  background: var(--album-primary, #365976);
  color: var(--album-text, white);
}

.track_number {
  width: 25px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.content_area {
  flex: 1;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  min-width: 0px;
}

.lyrics {
  max-width: 100%;
  margin: 0px;
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
  margin: 0px auto;
  width: 100%;
  max-width: 900px;
  box-sizing: border-box;
  margin-left: 35px;
  height: 100%;
}

.lyrics_container h3 {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.lyric-line {
  font-size: 16px;
  line-height: 25px;
  margin: 0px;
  opacity: 0.9;
  text-align: left;
}

.lyric-line:hover {
  opacity: 1;
}

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
  box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.5);
  object-fit: cover;
}

.no-song-selected p {
  font-size: 24px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  padding: 0px 20px;
}

.loading {
  color: #a1a1a1;
  text-align: center;
  padding: 40px;
  font-size: 19px;
}
</style>