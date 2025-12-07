<template>
  <header class="header">
    <RouterLink :to="{ name: 'Home'}">
          <div class="header_logo">
            <img src="./assets/icons/logo1.svg" alt="лого">
          </div>
    </RouterLink> 
    <nav class="nav">
      <!-- ссылки по имени маршрута -->
       <a href="#" @click.prevent="goToBiography">Биография</a>

       <RouterLink :to="{ name: 'Discography'}">Дискография</RouterLink>
       <RouterLink :to="{ name: 'Concerts'}">Концерты</RouterLink>
       <RouterLink :to="{ name: 'Favorites'}">Избранные</RouterLink>
       <RouterLink :to="{ name: 'Profile'}" class="profile_icon">
          <img src="./assets/icons/profile.svg" alt="профиль">
       </RouterLink>
    </nav>
  </header>


  <RouterView />  

  <AudioPlayer
      v-if="audioStore.isVisible"
      :src="audioStore.currentTrack?.audio_url"
      :currentSongTitle="audioStore.currentTrack?.title"
      :songList="audioStore.playlist"
      :currentSongIndex="audioStore.currentTrackIndex"
      @change-track="changeTrack"
      @track-ended="handleTrackEnded"
      ref="audioPlayerRef" 
  />

  <MiniPlayer />


  <footer class="footer">
    <div class="footer_column">
      <div class="logo_container">
        <img src="./assets/icons/logo1.svg" alt="футер лого">
        <p>PyroLab</p>
      </div>
    </div>

     <div class="footer_column">
        <router-link to="/">Главная</router-link>
        <a href="#" @click.prevent="goToBiography">Биография</a>
        <router-link to="/discography">Дискография</router-link>
        <router-link to="/concerts">Концерты</router-link>
        <router-link to="/favorites">Избранные</router-link>
        <router-link to="/photo">Фото</router-link>
        <router-link to="/videos">Видео</router-link>
        <router-link to="/merch">Мерч</router-link>
      
    </div>

    <div class="footer_column">
      <div class="icon_container">
        <p>Pyrokinesis в соц сетях</p>
        <div class="social_links_column">
          <a href="" class="social_links">
            <img src="./assets/icons/inst.svg" alt="">
          </a>
          <a href="" class="social_links">
          <img src="./assets/icons/tt.svg" alt="">
          </a>
          <a href="" class="social_links">
            <img src="./assets/icons/tg.svg" alt="">
          </a>
          <a href="" class="social_links">
            <img src="./assets/icons/wk.svg" alt="">
          </a>
          <a href="" class="social_links">
            <img src="./assets/icons/spotify.svg" alt="">
          </a>
          <a href="" class="social_links">
            <img src="./assets/icons/yt.svg" alt="">
          </a>
          
        </div>
      </div>
    </div>

    <div class="footer_column">
      <div class="text_container">
        <p>© 2025 PyroHQ</p>
        <p>Фанатский сайт</p>
        <p>Неофициальный ресурс</p>
        <p>*Все права на музыку и текста принадлежат артисту. Сайт создан фанатом для фанатов и несет исключительно информационный характер.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { useAudioPlayerStore } from './stores/audioPlayer'
import AudioPlayer from './components/AudioPlayer.vue'
import MiniPlayer from './components/MiniPlayer.vue'

export default {
  name: 'App',
  components: { 
    AudioPlayer,
    MiniPlayer  
  },
  setup() {
    const audioStore = useAudioPlayerStore()
    
    const changeTrack = (index) => {
  console.log('App: changeTrack to index', index)
  audioStore.changeTrack(index)
    }

    return {
      audioStore,
      changeTrack
    }
  },
  methods: {
    async goToBiography() {
      if (this.$route.path === '/') {
        this.$nextTick(() => {
          this.scrollToBiography()
        })
      } else {
        await this.$router.push('/')
        this.$nextTick(() => {
          this.scrollToBiography()
        })
      }
    },
    
    scrollToBiography() {
      setTimeout(() => {
        const element = document.getElementById('biography')
        if (element) {
          const offset = 40
          const targetPosition = element.offsetTop - offset
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })
        }
      }, 150)
    },
    handleTrackEnded() {
      console.log('Трек закончился, включаем следующую...')
      
      // Автоматически включаем следующую песню
      if (this.audioStore.currentTrackIndex < this.audioStore.playlist.length - 1) {
        const nextIndex = this.audioStore.currentTrackIndex + 1
        this.audioStore.changeTrack(nextIndex)
      }
    },
    watch: {
  'audioStore.isPlaying': function(newVal) {
    if (newVal) {
      // Когда isPlaying становится true, запускаем воспроизведение
      this.$nextTick(() => {
        const audioElement = document.querySelector('audio')
        if (audioElement && audioElement.src) {
          audioElement.play().catch(e => {
            console.log('Не удалось запустить воспроизведение:', e)
          })
        }
      })
    }
  }
}
  

  }
}
    // goToBiography() {
    //   if (this.$route.path === '/') {
    //     const element = document.getElementById('biography')
    //     if (element) {
    //       // element.scrollIntoView({ 
    //       //   behavior: 'smooth',
    //       //   block: 'start',
    //       //   inline: 'nearest'
    //       // })
    //       window.scrollTo({
    //             top: element.offsetTop,
    //             behavior: 'smooth'
    //         })
    //     }
    //   } else {
    //     this.$router.push({ path: '/', hash: '#biography' })
    //   }
    // }
  

</script>



<style>
html, body {
  height: 100%;
  padding: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>

<style scoped>
  .header {
    width: 100%;
    height: 44px;
    padding: 16px 32px; 
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    background-color: black;
  }

  .header_logo {
    display: flex; 
    align-items: center; 
    gap: 30px; 
  }

  .header_logo img { 
    width: 54px; 
    height: 64px;  
    margin-top: 7px;
  }

  .nav {
    display: flex;
  }

  .nav a {
    color: white;
    text-decoration: none;
    margin-left: auto;
    align-items: center;
    padding: 16px 15px;
    margin-right: 15px;
    font-size: 20px;
    font-family: "Zen_Kaku_Gothic_New";
  }
  
.footer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 300px;
  background-color: black;
  color: #AAAAAA;
  padding: 20px;
  z-index: 1000;
  margin-top: auto;
  font-size: 20px;
}

.logo_container {
  display: flex;
  align-items: center;
  gap: 14px;  
}

.logo_container img {
  width: 40px;
  margin-top: -10px;
  filter: brightness(0) invert(0.67);
}

.footer_column a {
  display: block;
  color: #ccc;
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.3s;
}

.social_links_column {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  max-width: 200px; 
  justify-items: center;
  margin-top: 10px;
}

.social_links {
  display: flex;
  justify-content: center;
  align-items: center;
}

.social_links img {
  width: 24px;
  height: 24px;
  
}

.social_links_column a:nth-last-child(2) {
  grid-column: 2 / 3; 
  justify-self: center; 
}

.text_container p {
  margin-bottom: 10px;
}

</style>



