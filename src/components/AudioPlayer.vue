<template>
  <div class="audio-player">
    <!-- Прогресс-бар -->
    <div class="progress-bar" @click="seek">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>

    <!-- Основные контролы -->
    <div class="player-controls">
      <!-- Кнопка воспроизведения/паузы -->
      <button class="control-btn play-pause" @click="togglePlay">
        <!-- <svg v-if="!isPlaying" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg> -->
        <img 
            v-if="!isPlaying" 
            src="@/assets/icons/play.png" 
            alt="Play"
            class="icon"
        >
        <img 
            v-else 
            src="@/assets/icons/pause.png" 
            alt="Pause"
            class="icon"
        >
      </button>

      <!-- Текущее время и длительность -->
      <div class="time-display">
        <span class="current-time">{{ formatTime(currentTime) }}</span>
        <span class="duration">{{ formatTime(duration) }}</span>
      </div>

      <!-- Правые кнопки -->
      <div class="right-controls">
        <!-- Сердечко -->
        <button class="control-btn favorite" @mouseenter="showFavoriteTooltip = true" @mouseleave="showFavoriteTooltip = false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
          </svg>
          <div v-if="showFavoriteTooltip" class="tooltip">Войдите в аккаунт, чтобы добавить в избранное</div>
        </button>

        <!-- Кнопка скачивания -->
        <button class="control-btn download" @mouseenter="showDownloadTooltip = true" @mouseleave="showDownloadTooltip = false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          <div v-if="showDownloadTooltip" class="tooltip">Войдите в аккаунт, чтобы загрузить трек</div>
        </button>

        <!-- Кнопка поделиться -->
        <button class="control-btn share" @mouseenter="showShareTooltip = true" @mouseleave="showShareTooltip = false" @click="shareTrack">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
          </svg>
          <div v-if="showShareTooltip" class="tooltip">Поделиться треком</div>
        </button>
      </div>
    </div>

    <!-- Скрытый audio элемент -->
    <audio 
      ref="audioElement"
      :src="src"
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
      showShareTooltip: false
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
      this.isPlaying = false
      this.currentTime = 0
      this.progress = 0
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
        // Fallback для браузеров без поддержки Web Share API
        navigator.clipboard.writeText(window.location.href)
        alert('Ссылка скопирована в буфер обмена!')
      }
    }
  }
}
</script>

<style scoped>
.audio-player {
  background: rgba(0, 0, 0, 0.9);
  padding: 15px 20px;
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  margin-bottom: 15px;
  cursor: pointer;
  position: relative;
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

.player-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.play-pause {
  width: 40px;
  height: 40px;
  background: white;
  color: black;
}

.play-pause:hover {
  background: #f0f0f0;
  transform: scale(1.05);
}

.time-display {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-family: monospace;
}

.right-controls {
  display: flex;
  align-items: center;
  gap: 10px;
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
  z-index: 1000;
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
</style>