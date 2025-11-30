import { defineStore } from 'pinia'

export const useAudioPlayerStore = defineStore('audioPlayer', {
  state: () => ({
    currentTrack: null,
    currentTrackIndex: 0,
    playlist: [],
    isPlaying: false,
    isVisible: false
  }),
  
  actions: {
    // Установить текущий трек и показать плеер
    setCurrentTrack(track, playlist = [], index = 0) {
    //   console.log('🔄 Store.setCurrentTrack вызван:', track?.title)
      
      // Явно обновляем каждое поле
      this.currentTrack = track
      this.playlist = playlist
      this.currentTrackIndex = index
      this.isPlaying = false
      this.isVisible = true
      
    //   console.log('🔄 Store обновлен:'
        , {
        isVisible: this.isVisible,
        currentTrack: this.currentTrack?.title
      }
    },
    
    // Переключить воспроизведение
    togglePlay() {
      this.isPlaying = !this.isPlaying
    },
    
    // Сменить трек
    changeTrack(index) {
      if (index >= 0 && index < this.playlist.length) {
        this.currentTrackIndex = index
        this.currentTrack = this.playlist[index]
        this.isPlaying = false
      }
    },
    
    // Скрыть плеер
    hidePlayer() {
      this.isVisible = false
      this.isPlaying = false
      this.currentTrack = null
      this.playlist = []
    }
}
})