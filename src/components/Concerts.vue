<template>
  <div class="concerts-page">
    <div class="container">
      <h2>Актуальные концерты</h2>
      
      <!-- Просто афиша турне -->
      <div class="tour-poster">
        <div class="poster-wrapper">
          <img :src="posterMoscow" alt="Концерт Москва" class="poster" />
        </div>
        <div class="poster-wrapper">
          <img :src="posterSpb" alt="Концерт Спб" class="poster" />
        </div>
        <div class="poster-wrapper">
          <img :src="posterSpb2" alt="Концерт Спб" class="poster" />
        </div>
        
      </div>
        
        <!-- Ссылка на билеты -->
        <a 
          href="https://pyrokinesistour.ru/?ysclid=millv4ietj494226044#rec754260074" 
          target="_blank" 
          class="tickets-link"
        >
          Купить билеты на официальном сайте
        </a>

      <!-- Если афиши нет -->
      <div v-if="noConcerts" class="no-concerts">
        <h3>Концертов пока нет</h3>
        <p>Следите за обновлениями</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import posterMoscow from '../assets/images/concerts/conc3.jpg'
import posterSpb from '../assets/images/concerts/conc1.jpg'
import posterSpb2 from '../assets/images/concerts/conc2.jpg'

const noConcerts = ref(false)

function showNoConcerts() {
  noConcerts.value = true
}
</script>

<style scoped>
.concerts-page {
  padding: 2rem;
  text-align: center;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 40px;
  font-family: "Zen_Kaku_Gothic_New";
}

.tour-poster {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.poster-wrapper {
  flex: 1;
  max-width: 30%;
  min-width: 350px;
}

.poster {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.poster:hover {
  transform: scale(1.02);
}

.tickets-link {
  display: inline-block;
  background: #ffffff;
  color: rgb(0, 0, 0);
  font-family: "Zen_Kaku_Gothic_New_Bold";
  border: none;
  padding: 15px 30px;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
  width: 50%;
  transition: background 0.3s ease;
  text-decoration: none;
}

.tickets-link:hover {
  background: #636363;
}

.no-concerts {
  padding: 4rem 2rem;
  color: #666;
}

.no-concerts h3 {
  margin-bottom: 1rem;
}
</style>