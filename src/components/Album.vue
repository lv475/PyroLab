<template>
  <div class="discography">
    <!-- список -->
    <div class="songs_panel">
      <div class="songs_panel_img">
        <img src="../src/assets/album.jpg", alt="">
      </div>
      <ul class="songs_list">
        <!-- active подсвечивает песню -->
        <li 
          v-for="song in songs" 
          :key="song.id"
          :class="{ active: currentSong.id === song.id }"  
          @click="selectSong(song)"
        >
          {{ song.title }}
        </li>
      </ul>
    </div>

    <!-- Основной контент -->
    <div 
      class="content_area" 
      :style="{ backgroundImage: `url(${currentSong.background})`}"
    >
      <!-- Текст песни -->
      <div class="lyrics_container">
        <h3>{{ currentSong.title }}</h3>
        <div class="lyrics">
          <p v-for="(line, index) in currentSong.lyrics" :key="index">
            {{ line }}
          </p>
        </div>
      </div>

      <!-- Аудио плеер -->
      <div class="audio_player">
        <audio 
          ref="audioPlayer"
          :src="currentSong.audio"
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

export default {
  name: 'DiscographyPage',
  data() {
    return {
      currentSong: {},
      progress: 0,
      songs: [
        {
          id: 1,
          title: "Название песни 1",
          background: "/src/assets/song1-bg.jpg ", // ваша картинка
          audio: "/src/assets/song1.mp3", // ваш аудио файл
          lyrics: [
            "Строчка 1 текста песни",
            "Строчка 2 текста песни", 
            "Строчка 3 текста песни",
            "И так далее..."
          ]
        },
        {
          id: 2,
          title: "Название песни 2",
          background: "/src/assets/song2-bg.jpg",
          audio: "/src/assets/song2.mp3",
          lyrics: [
            "Текст второй песни",
            "Вторая строчка",
            "Третья строчка"
          ]
        },
       
      ]
    }
  },
  mounted() {
    // По умолчанию выбираем первую песню
    this.currentSong = this.songs[0]
  },
  methods: {
    selectSong(song) {
      this.currentSong = song
      this.progress = 0
      
      // Автоматически запускаем воспроизведение при смене песни
      this.$nextTick(() => {
        const audio = this.$refs.audioPlayer
        audio.play().catch(e => console.log("Автовоспроизведение заблокировано"))
      })
    },
    updateProgress() {
      const audio = this.$refs.audioPlayer
      if (audio.duration) {
        this.progress = (audio.currentTime / audio.duration) * 100
      }
    }
  }
}
</script>

<style scoped>
.discography {
  display: flex;
  height: 100vh;
}

/* Панель с песнями */
.songs_panel {
  width: 300px;
  background: #2c2c2c;
  color: white;
  padding: 20px;
  overflow-y: auto;
}

.songs_list {
  list-style: none;
  padding: 0;
}

.songs_list li {
  padding: 15px;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
}

.songs_list li:hover {
  background: #4a4a4a;
}

.songs_list li.active {
  background: #4680be;
  color: white;
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
}

/* Контейнер для текста песни */
.lyrics_container {
  flex: 1;
  padding: 40px;
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.7); /* полупрозрачный фон для читаемости */
}

.lyrics_container h3 {
  font-size: 2em;
  margin-bottom: 30px;
}

.lyrics p {
  font-size: 1.2em;
  line-height: 1.6;
  margin: 10px 0;
}

/* Аудио плеер */
.audio_player {
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  position: sticky;
  bottom: 0;
}

audio {
  width: 100%;
  margin-bottom: 10px;
}

.progress_bar {
  width: 100%;
  height: 5px;
  background: #555;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #007bff;
  transition: width 0.1s;
}
</style>
