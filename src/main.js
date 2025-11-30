import { createApp } from 'vue'
import { createPinia } from 'pinia' 
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

// app.config.globalProperties.$audioPlayer = {
//   currentTrack: null,
//   currentTrackIndex: 0,
//   playlist: [],
//   setCurrentTrack(track, playlist = [], index = 0) {
//     this.currentTrack = track
//     this.playlist = playlist
//     this.currentTrackIndex = index
//   }
// }

app.use(pinia)
app.use(router)
app.mount('#app')  //обязательно в этом порядке 