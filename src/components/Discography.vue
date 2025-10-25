<!-- <template>
    <div class="albums">
        <p>Альбомы</p>
        <div class="album_eclipse">
            <img src="../assets/images/discography/eclipse.png" alt="эклипс">
           
        </div>
        
    </div>
</template> -->

<template>
  <div class="albums">
    <h3>Альбомы</h3>
    
    <div class="albums">
      <div class="album_card" @click="$router.push('/album')">
        <img src="../assets/images/discography/eclipse.png" alt="обложка альбома">
        <p>ECLIPSE</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.discograph p {
  font-size: 20px;
}

.discograph h3 {
  font-size: 24px;
}

.albums {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}

.album_card {
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    cursor: pointer;
}


.album_card img {
  width: 200px;
  height: 200px;
}
</style>