<template>
  <main class="main_page">
    <div class="container">
      <div class="main_photo">
        <img src="" alt="">
      </div>
      <div class="main_content">
        <h1>Pyrokinesis</h1>
        <h2>Люди говорят —  мол, тексты не горят, но я сжигал в них всё и птицей отпускал</h2>
      </div>
    </div>
  </main>
  
  <!-- <div class="menu">

  </div> -->
 
 
</template>

<style scoped>

.container {
  display: flex;
  width: 1440px;
  height: 1000px;
}

.main_photo {
  position: absolute;
  left: 0;
 
  width: 100%;
  height: 100%;
  z-index: 1; 
}

.main_photo img {
  top: 130px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main_content{
  position: relative;
  z-index: 2;
}

/* .main {
  background-image: url('@/assets/images/main.png');

} */
</style>