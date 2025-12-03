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
    setCurrentTrack(track, playlist = [], index = 0) {
      
      this.currentTrack = track
      this.playlist = playlist
      this.currentTrackIndex = index
      this.isPlaying = false
      this.isVisible = true
      
        , {
        isVisible: this.isVisible,
        currentTrack: this.currentTrack?.title
      }
    },
    
    togglePlay() {
      this.isPlaying = !this.isPlaying
    },
    
    changeTrack(index) {
      if (index >= 0 && index < this.playlist.length) {
        this.currentTrackIndex = index
        this.currentTrack = this.playlist[index]
        this.isPlaying = false
      }
    },
    
    hidePlayer() {
      this.isVisible = false
      this.isPlaying = false
      this.currentTrack = null
      this.playlist = []
    }
}
})