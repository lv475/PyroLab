import { defineStore } from 'pinia'

export const useAudioPlayerStore = defineStore('audioPlayer', {
  state: () => ({
    currentTrack: null,
    currentTrackIndex: 0,
    playlist: [],
    isPlaying: false,
    isVisible: false,
    shouldAutoPlay: true 
  }),
  
  actions: {
    setCurrentTrack(track, playlist = [], index = 0) {
      this.currentTrack = track
      this.playlist = playlist
      this.currentTrackIndex = index
      this.isVisible = true
      this.shouldAutoPlay = true
    },
    
    togglePlay() {
      this.isPlaying = !this.isPlaying
    },
    
    play() {
      this.isPlaying = true
      this.shouldAutoPlay = true
    },
    
    pause() {
      this.isPlaying = false
    },
    
    changeTrack(index) {
      if (index >= 0 && index < this.playlist.length) {
        this.currentTrackIndex = index
        this.currentTrack = this.playlist[index]
        this.isPlaying = true
        this.shouldAutoPlay = true
      }
    },
    
    nextTrack() {
      if (this.currentTrackIndex < this.playlist.length - 1) {
        const nextIndex = this.currentTrackIndex + 1
        this.changeTrack(nextIndex)
        return true 
      }
      return false 
    },
    
    prevTrack() {
      if (this.currentTrackIndex > 0) {
        const prevIndex = this.currentTrackIndex - 1
        this.changeTrack(prevIndex)
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