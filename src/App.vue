<template>
  <header class="header">
    <RouterLink :to="{ name: 'Home'}">
          <div class="header_logo">
            <img src="./assets/icons/logo1.svg" alt="лого">
          </div>
    </RouterLink> 
    <nav class="nav">
      <!-- ссылки по имени маршрута -->
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
    <p></p>
  </footer>
</template>


<style scoped>
  .header {
    padding: 16px 32px; 
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    width: 100%; 
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