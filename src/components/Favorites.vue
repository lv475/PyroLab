<template>
  <div class="favorites-page">
    <div class="page-background">
      <img src="@/assets/images/background-img.png" alt="фон">
    </div>
    
    <div class="page-content">
      <div class="favorites-container">
        <div class="heart-icon">
          <svg width="300" height="300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" 
                  stroke="rgba(255, 255, 255, 0.7)" 
                  stroke-width="0.33" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"/>
          </svg>
        </div>
        
        <h1 class="favorites-title">Авторизируйтесь, чтобы добавлять треки в избранное</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavoritesPage'
}
</script>

<style scoped>
.favorites-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.page-background {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.page-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}

.page-content {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.favorites-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 1200px;
  min-height: 600px;
}

.heart-icon {
  position: absolute;
  z-index: 1;
  opacity: 0.7;
  pointer-events: none;
}

.heart-icon svg {
  width: 300px;
  height: 300px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
}

.favorites-title {
  position: relative;
  z-index: 2;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.4;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  color: white;
  max-width: 600px;
  padding: 20px;
}
</style>