<template>
  <div v-if="isVisible" class="audio-player" :class="{ minimized: isMinimized }">
    <button class="close-btn" @click="closePlayer">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>
    <button class="minimize-btn" @click="toggleMinimize">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path v-if="!isMinimized" d="M19 13H5v-2h14v2z"/>
        <path v-else d="M7 14l5-5 5 5z"/>
      </svg>
    </button>

    <div class="player-container">
      <div class="song-title" v-if="!isMinimized">
        {{ currentSongTitle }}
      </div>

      <div class="top-controls" v-if="!isMinimized">
          <div class="favorite-container">
            <button class="control-btn favorite" 
            @mouseenter="showFavoriteTooltip = true" 
            @mouseleave="showFavoriteTooltip = false">
            <img src="../assets/icons/favorite.svg" alt="Избранное" class="icon">
             
            <div v-if="showFavoriteTooltip" class="tooltip">Войдите в аккаунт, чтобы добавить в избранное</div>
          </button>
          </div>
         
        <div class="center-controls">
          <button class="control-btn prev" @click="prevTrack" :disabled="!hasPrevious">
            <img src="../assets/icons/last.svg" alt="Предыдущий" class="icon">
          </button>

          <button class="control-btn play-pause" @click="togglePlay">
            <img 
              v-if="!isPlaying" 
              src="../assets/icons/play.svg" 
              alt="Play"
              class="icon"
            >
            
            <svg 
              v-else 
              viewBox="0 0 40 40"
              class="icon pause-svg"
            >
              <rect x="4" y="0" width="10" height="40" fill="white"/>
              <rect x="26" y="0" width="10" height="40" fill="white"/>
            </svg>
          </button>

          <button class="control-btn next" @click="nextTrack" :disabled="!hasNext">
            <img src="../assets/icons/next.svg" alt="Следующий" class="icon">
          </button>
        </div>

        <div class="right-controls">
          <button class="control-btn download" @mouseenter="showDownloadTooltip = true" @mouseleave="showDownloadTooltip = false">
            <img src="../assets/icons/download.svg" alt="Скачать" class="icon">
            <div v-if="showDownloadTooltip" class="tooltip">Войдите в аккаунт, чтобы загрузить трек</div>
          </button>

          <button class="control-btn share" @mouseenter="showShareTooltip = true" @mouseleave="showShareTooltip = false" @click="shareTrack">
            <img src="../assets/icons/share.svg" alt="Поделиться" class="icon">
            <div v-if="showShareTooltip" class="tooltip">Поделиться треком</div>
          </button>
        </div>
      </div>

      <div class="progress-section" v-if="!isMinimized">
        <span class="time-start">{{ formatTime(currentTime) }}</span>
        
        <div class="progress-bar" @click="seek">
          <div class="progress" :style="{ width: progress + '%' }">
            <div class="progress-circle"></div>
          </div>
        </div>
        
        <span class="time-end">{{ formatTime(duration) }}</span>
      </div>

      <div v-else class="minimized-player">
        <button class="control-btn play-pause" @click="togglePlay">
          <img 
            v-if="!isPlaying" 
            src="../assets/icons/play.svg" 
            alt="Play"
            class="icon"
          >
          
          <svg 
            v-else 
            viewBox="0 0 40 40"
            class="icon pause-svg"
          >
            <rect x="8" y="0" width="10" height="40" fill="white"/>
            <rect x="22" y="0" width="10" height="40" fill="white"/>
          </svg>
        </button>
        <span class="minimized-title">{{ currentSongTitle }}</span>
      </div>
    </div>

    <audio 
      ref="audioElement"
      :src="src"
      preload="none"
      @timeupdate="updateProgress"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
    ></audio>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    src: {
      type: String,
      required: true
    },

    currentSongTitle: {  
      type: String,
      default: 'Название трека'
    },
    songList: {  
      type: Array,
      default: () => []
    },
    currentSongIndex: {  
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      progress: 0,
      showFavoriteTooltip: false,
      showDownloadTooltip: false,
      showShareTooltip: false,
      isMinimized: false,
      isVisible: true,
    }
  },

  computed: {
    hasPrevious() {
      return this.currentSongIndex > 0
    },
    hasNext() {
      return this.currentSongIndex < this.songList.length - 1
    }
  },

  watch: {
    src(newSrc) {
      if (newSrc && !this.isVisible) {
        this.isVisible = true  
      }
    }
  },

  methods: {
    
    togglePlay() {
      const audio = this.$refs.audioElement
      if (this.isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      this.isPlaying = !this.isPlaying
    },

    closePlayer() {
      const audio = this.$refs.audioElement
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
      this.isPlaying = false
      this.isVisible = false
  },

    toggleMinimize() {
      this.isMinimized = !this.isMinimized
    },

    prevTrack() {
  if (this.hasPrevious) {
    const prevIndex = this.currentSongIndex - 1
    
    this.$emit('change-track', prevIndex)
    
    this.$nextTick(() => {
      setTimeout(() => {
        const audio = this.$refs.audioElement
        if (audio) {
          console.log('AudioPlayer: Автозапуск предыдущей песни')
          audio.currentTime = 0
          audio.play().catch(e => {
            console.log('AudioPlayer: Не удалось автозапустить:', e)
          })
        }
      }, 300) 
    })
  }
},

    nextTrack() {
  if (this.hasNext) {
    const nextIndex = this.currentSongIndex + 1
    
    this.$emit('change-track', nextIndex)
    
    this.$nextTick(() => {
      setTimeout(() => {
        const audio = this.$refs.audioElement
        if (audio) {
          console.log('AudioPlayer: Автозапуск следующей песни')
          audio.currentTime = 0
          audio.play().catch(e => {
            console.log('AudioPlayer: Не удалось автозапустить:', e)
          })
        }
      }, 300) 
    })
  }
},

    updateProgress() {
      const audio = this.$refs.audioElement
      this.currentTime = audio.currentTime
      this.duration = audio.duration
      this.progress = (audio.currentTime / audio.duration) * 100
    },

    onLoadedMetadata() {
      this.duration = this.$refs.audioElement.duration
    },

    onEnded() {
  this.currentTime = 0
  this.progress = 0
  
  console.log('Трек закончился (AudioPlayer)')
  
  this.$emit('track-ended')
  
  if (this.hasNext) {
    console.log('Включаем следующую песню через nextTrack()')
    this.nextTrack()
  }
},

    seek(event) {
      const progressBar = event.currentTarget
      const clickPosition = event.offsetX
      const progressBarWidth = progressBar.offsetWidth
      const percentage = (clickPosition / progressBarWidth) * 100
      
      const audio = this.$refs.audioElement
      audio.currentTime = (percentage / 100) * audio.duration
    },

    formatTime(seconds) {
      if (!seconds) return '0:00'
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = Math.floor(seconds % 60)
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    },

    shareTrack() {
      if (navigator.share) {
        navigator.share({
          title: 'Поделиться треком',
          text: 'Послушай этот трек!',
          url: window.location.href
        })
      } else {
        navigator.clipboard.writeText(window.location.href)
        alert('Ссылка скопирована в буфер обмена!')
      }
    }
  }
}
</script>

<style scoped>
.audio-player {
  position: fixed;  
  bottom: 0;        
  left: 0;          
  right: 0;      
  background: rgba(0, 0, 0, 0.9);
  padding: 15px 20px;
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000; 
}

.player-container {
  max-width: 960px; 
  margin: 0 auto;
  padding: 15px 20px;
  position: relative;
  min-height: 80px;
}

.song-title {
  text-align: center;
  color: white;
  font-size: 16px;
  font-family: "Zen_Kaku_Gothic_New_Bold";
  margin-bottom: 5px;
  font-weight: 500;
  margin-top: -30px; 
}

.top-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.left-controls {
  display: flex;
}

.right-controls {
  display: flex;
  gap: 10px;
}

.control-btn.favorite .icon,
.right-controls .icon {
  width: 30px;    
  height: 30px;   
}

.progress-section {
  position: absolute;
  bottom: 20px;
  left: 40px;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 15px;

}

.time-start,
.time-end {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-family: "Zen_Kaku_Gothic_New";
  min-width: 40px;
  position: absolute;
  bottom: -30px;
}

.time-start {
  text-align: left;
  left: 0;
}

.time-end {
  text-align: right;
  right: 0;
}


.progress-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  margin: 0 10px;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #6e6e6e, #ffffff);
  border-radius: 2px;
  transition: width 0.1s;
  position: relative;
}

.progress::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s;
}

.progress-bar:hover .progress::after {
  opacity: 1;
}

.progress-circle {
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
}

.favorite-container {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  padding: 20px; 
  z-index: 10002;
}

.control-btn.favorite {
  position: relative;
}


.center-controls {
  display: flex;
  justify-content: center; 
  align-items: center;
  gap: 25px;
  width: 100%; 
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.control-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}


.control-btn.play-pause {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
  overflow: visible; 
}

.control-btn.play-pause .icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}

.pause-icon-large {
  width: 60px;
  height: 60px;
  position: relative;
  z-index: 1;
  margin: -10px; 
}

.control-btn.play-pause.is-paused {
  width: 45px;
  height: 45px;
  margin: -2.5px; 
}


.control-btn.play-pause {
  width: 40px;
  height: 40px;
  color: black;
}

.control-btn.play-pause:hover {
  transform: scale(1.1);
}

.control-btn .icon {
  width: 40px;
  height: 40px;
  display: block;
}

.pause-svg {
  width: 40px;
  height: 40px;
  display: block;
}


.prev, .next {
  width: 40px;
  height: 40px;
}


.time-display {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-family: "Zen_Kaku_Gothic_New";
}

.right-controls {
  position: absolute;
  right: 40px;
  top: 44%;
  transform: translateY(-50%);
  display: flex;
  gap: 15px;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  margin-bottom: 8px;
  backdrop-filter: blur(10px);
  z-index: 10001;
  pointer-events: none;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.8);
}

.audio-player {
  overflow: visible; 
}

.player-container {
  overflow: visible; 
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  border: none;
  color: white;
  padding: 4px 8px;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  z-index: 1001;
}

.close-btn:hover {
  background: rgba(255, 0, 0, 0.3);
}

.minimize-btn {
  position: absolute;
  top: 8px;
  left: 20px;
  background: rgba(0, 0, 0, 0.9);
  border: none;
  color: white;
  padding: 4px 8px;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
}

.minimized-player {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
 justify-content: center; 
  height: 100%;
  margin-top: -9px;
}

.minimized-title {
  color: white;
  font-size: 16px;
}

.audio-player.minimized {
  padding: 5px 20px;
  height: 50px;
}


.minimized-player .pause-svg {
  width: 30px;
  height: 30px;
}
</style>