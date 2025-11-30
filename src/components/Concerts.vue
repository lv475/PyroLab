<template>
  <div class="concerts-page">
    <div class="container">
      <h1>Концерты</h1>
      
      <!-- Просто афиша турне -->
      <div class="tour-poster">
        <img :src="posterSpb" alt="Концерт Спб" />
        <img :src="posterSpb2" alt="Концерт Спб" />
        
        <!-- Ссылка на билеты -->
        <a 
          href="https://official-site.com/tickets" 
          target="_blank" 
          class="tickets-link"
        >
          Купить билеты на официальном сайте
        </a>
      </div>

      <!-- Если афиши нет -->
      <div v-if="noConcerts" class="no-concerts">
        <h2>Концертов пока нет</h2>
        <p>Следите за обновлениями</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import posterSpb from '../assets/images/concerts/'

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

h1 {
  margin-bottom: 2rem;
  color: #333;
}

.tour-poster {
  margin-bottom: 2rem;
}

.tour-poster img {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.tickets-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 1rem 2rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}

.tickets-link:hover {
  background: #0056b3;
}

.no-concerts {
  padding: 4rem 2rem;
  color: #666;
}

.no-concerts h2 {
  margin-bottom: 1rem;
}
</style>