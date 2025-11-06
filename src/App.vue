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
  <!-- активная страница -->
  <RouterView />  

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
        <router-link to="/photos">Фото</router-link>
        <router-link to="/videos">Видео</router-link>
        <router-link to="/merch">Мерч</router-link>
      
    </div>

    <div class="footer_column">
      <div class="icon_container">
        <p>Pyrokinesis в соц сетях</p>
        <div class="social_links">
          <img src="" alt="">
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
export default {
  methods: {
    goToBiography() {
      if (this.$route.path === '/') {
        const element = document.getElementById('biography')
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          })
        }
      } else {
        this.$router.push({ path: '/', hash: '#biography' })
      }
    }
  }
}
</script>

<!-- <style>
/* Без scoped! */
html {
  overflow-x: hidden;
  scroll-behavior: smooth;
}

body {
 
  overflow-x: hidden;
}

[id]:focus {
  outline: none;
}

#biography:focus {
  outline: none;
  box-shadow: none;
}
</style> -->

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




</style>

<!-- .nav a {
    display: flex !important;
    gap: 30px;
    color: white;
    text-decoration: none;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    margin-left: auto;
    align-items: center;
  }
   -->

