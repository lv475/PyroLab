<template>
  <main class="main_page">
    <div class="container">
      <div class="main_photo">
        <img src="../assets/images/main_img.png" alt="главное фото">
      </div>
      <div class="main_content">
        <h1>Pyrokinesis</h1>
        <div class="quote">
          <p>Люди говорят —  мол, тексты не <br>горят, но я сжигал в них всё и <br>птицей отпускал</p>
          <img src=".." alt="">
        </div>
      </div>
    </div>
  </main>
  
  <section class="page_cards">
  <div class="cards"> 
    <div class="card" >
      <router-link to="/photo">
        <img src="../assets/images/Group_photo.png" alt="фотографии">
        <p>Фотографии</p>
      </router-link>
    </div>

    <div class="card" >
      <router-link to="/videos">
        <img src="../assets/images/Group_video.png" alt="видео">
        <p>Видео</p>
      </router-link>
    </div>

    <div class="card" >
      <router-link to="/merch">
        <img src="../assets/images/Group_merch.png" alt="мерч">
        <p>Мерч</p> 
      </router-link>
    </div>
  </div>    
  </section>

  <section id="biography" class="biography_section">
    <h2>Биография</h2>
    <p>Pyrokinesis (Пирокинéзис). Настоящее имя — Федорóвич Андрей Игоревич. Российский рэпер и поэт-песенник, завоевавший сердца фанатов в каждом уголке страны и за её пределами. 

Родился 16 декабря 1995 года в посёлке Багерово в Крыму, детство провёл во Львове, в подростковом возрасте переехал в Краснодар. Учился в Кубанском государственном университете на физико-техническом факультете по специальности «Электроника и наноэлектроника». Со слов самого Пирокинезиса, на втором курсе он полностью отдался музыке и отложил учёбу на второй план, хотя и получил диплом.</p>
    <div class="accordion">
      <div class="accordion_item" v-for="(item, index) in bioItems" :key="index">
        <div class="accordio_string">
          <div class="accordio_header" @click="toggleItem(index)" style="display: flex; gap: 10px; align-items: center;">
            <h3 style="margin-bottom: 15px; font-size: 32px; font-style: italic;">{{ item.title }}</h3>
            <div class="arrow_icon" :class="{ 'arrow_up': item.isOpen, 'arrow_down': !item.isOpen }" ></div>
          </div>
        </div>
        
        <div class="accordion_content" v-show="item.isOpen">
          <div v-for="(item, index) in bioItems" :key="index">
      
          <p v-for="(paragraph, pIndex) in item.content" :key="pIndex"
          style="margin-bottom: 15px; font-size: 20px;">
            {{ paragraph }}
          </p>
          
        </div>
        </div>
      </div>
    </div>
  </section>
 
</template>

<script>
export default {
  data() {
    return {
      bioItems: [
        {
          title: 'Творчество',
          content: [
            'Творческий путь Андрея начинался со стихотворений и рассказов, затем в его жизни началась началась эпоха рэпа. В то время исполнитель слушал композиции Касты, Oxxxymiron и многих участников рэп-баттлов, а после и сам начал принимать в них участия, но в основном в онлайне. Однако единожды, в 2014 году, принял участие в оффлайн батле SLOVO: Краснодар, но не прошел в сезон, показав слабое выступление. С 8 июня 2013 по ноябрь 2014 проходил Левый Баттл (Left Battle), в котором Андрей принял участие, но в финале проиграл рэперу Мëд. В 2019 дошел до второго раунда 17-го независимого онлайн-баттла на портале hip-hop.ru. ',
            'Благодаря баттлам он стал членом творческого объединения «#каждаябарбистерва» (КБС), куда помимо него входили (на тот момент и до/после) PlayingTheAngel, otnose., elastronauta, Aikko, Егор Натс, Забытый Женя, Дима Раджио и Фэ Эс Тэ. Треки выпускались исключительно для онлайн-баттлов.',
            '2015 год полноценно открыл ему дорогу в карьеру рэп исполнителя. Тогда вышел его перый мини-альбом «5», за которым последовал «Burn to Die» и полноценный альбом «Black Roze x Red Roze». В 2016 и 2017 вышли альбомы «Eclipse» и «Терновый венец эволюции», значительно повлиявшие на карьерный путь рэпера. Примерно в это же время, окончив университет в Краснодаре, в 2017 году исполнитель переехал в Санкт-Петербург, что значительно повлияло на его творчество, открыв больше возможностей и добавив музыкальных знакомств. В 2018 вышел альбом «Корми демонов по расписанию». В следующем году был выпущен альбом «Моя милая пустота», в первый день набравший почти два миллиона прослушиваний, а в 2020 — «Питер, чай, не Франция». 5 августа 2022 года ожидался выход нового альбома под названием «Геометрия тьмы», но позже релиз перенесли. 8 июля был выпущен сингл «Шёпот далёких звёзд», а 5 августа — сингл «Отказываю небу» с ожидаемой пластинки. 22 августа вышел тизер альбома, а премьера альбома состоялась 26 августа. 13 декабря 2024 года выходит первый сингл с грядущего альбома Mea Maxima Culpa, «День рождения наоборот». Выход альбома был анонсирован 1 февраля 2025 года. Сама пластинка вышла 21 февраля. Яндекс Музыкой было проведено интервью по поводу нового альбома.'
          ],
          isOpen: false
        },
       
      ]
    }
  },
  methods: {
   
    toggleItem(index) {
      console.log('клик:', index)
      this.bioItems[index].isOpen = !this.bioItems[index].isOpen
    }
  }
}
</script>

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

.cards {
  display: flex;
  justify-content: center;
  gap: 74px; 
  margin: 0 auto;
}

.card{
  margin-top: -250px;
  position: relative;
  cursor: pointer;
  z-index: 1000; 
}

.card a {
  display: block;
  text-decoration: none;
  color: inherit;
}

.card p{
  margin-top: -44px;
  margin-left: 35px;
  font-size: 24px;
  z-index: 1001; 
  pointer-events: none;
}

.biography_section h2 {
  margin-bottom: 15px;
  font-size: 32px;
  font-style: italic;
}

.biography_section p {
  margin-bottom: 15px;
  font-size: 20px;
}

.accordion_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow_icon {
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  transition: background-image 0.3s ease;
}


.arrow_down {
  background-image: url('../assets/icons/down.svg');
  filter: brightness(0) invert(1)
}

.arrow_up {
  background-image: url('../assets/icons/up.svg');
  filter: brightness(0) invert(1)
}





</style>