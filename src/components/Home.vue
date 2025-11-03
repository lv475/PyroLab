<template>
  <main class="main_page">
    <div class="container">
      <div class="main_photo">
        <img src="../assets/images/main_img.png" alt="главное фото">
      </div>
      <div class="main_content">
        <h1>Pyrokinesis</h1>
        <p>Люди говорят —  мол, тексты не <br>горят, но я сжигал в них всё и <br>птицей отпускал</p>
      </div>
    </div>
  </main>
  
  <section class="page_cards">
    <div class="card">
      <img src="../assets/images/Group_photo.png" alt="фотографии">
      <p>Фотографии</p>
    </div>
  </section>
 
</template>

<style scoped>



.container {
  display: flex;
  max-width: 1440px;
  height: 1000px;
  margin: 0 auto;
}

.main_photo {
  position: absolute;
  left: 0;
  top: 74px;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.main_photo img {
  width: 1440px;
  height: 100%;
  object-fit: cover;
  mask-image: linear-gradient(
    to bottom,
    black 0%,
    black 75%,
    transparent 100%
  );

}


.main_content{
  position: relative;
  z-index: 2;
  width: 1440px;

}

.main_content h1{
  font-family: "Koulen";
  font-size: 100px;
  /* left: 795px;
  top: 629px; */
  margin: 560px;
  margin-right: 175px;
}

.main_content p{
   margin-top: -740px;
   margin-left: 50px;
   font-size: 36px;
   line-height: 30px;
}

.card{
  margin-top: -250px;
}

.card p{
  margin-top: -44px;
  margin-left: 35px;
  font-size: 24px;
}



.main_page, .page_cards {
  transform: scale(1);
  transform-origin: top center;
}

.container, .main_photo, .main_content, .card {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
}

/* Принудительно фиксируем все размеры */
* {
  flex-shrink: 0;
  flex-grow: 0;
}

/* Отключаем любые анимации при ресайзе */
@media (max-resolution: 1dppx) {
  .main_page {
    will-change: transform;
  }
}

</style>