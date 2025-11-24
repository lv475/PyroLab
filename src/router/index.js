// import { createRouter, createWebHistory } from 'vue-router' //Импортируем фабрики из vue-router. экземпляр роутера и включение хистори апи

// import Home from '../components/Home.vue'
// import Discography from '../components/Discography.vue'
// import Concerts from '../components/Concerts.vue'
// import Favorites from '../components/Favorites.vue'
// import Profile from '../components/Profile.vue'
// import Album from '../components/Album.vue'
// import Photo from '../components/Photo.vue'
// import Video from '../components/Video.vue'
// import Merch from '../components/Merch.vue'

// //таблица маршрутов
// const routes = [
//   { path: '/', name: 'Home',  component: Home  }, // главная страница
//   { path: '/discography', name: 'Discography', component: Discography },  // страница "дискография"
//   { path: '/сoncerts', name: 'Concerts', component: Concerts },
//   { path: '/favorites', name: 'Favorites', component: Favorites},
//   { path: '/profile', name: 'Profile', component: Profile},
//   { path: '/album:id', name: 'Album', component: Album},
//   { path: '/photo', name: 'Photo', component: Photo},
//   { path: '/video', name: 'Video', component: Video},
//   { path: '/merch', name: 'Merch', component: Merch}
// ]

// const router = createRouter({
//   history: createWebHistory(), // красивые адреса без #
//   routes,  //таблица
//   scrollBehavior(to, from, savedPosition) {
//      if (to.hash) {
//       return {
//         el: to.hash,
//         behavior: 'smooth'
//       }
//     }
//     return { top: 0 }
//   }
// })



// export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Discography from '../components/Discography.vue'
import Concerts from '../components/Concerts.vue'
import Favorites from '../components/Favorites.vue'
import Profile from '../components/Profile.vue'
import Album from '../components/Album.vue'
import Photo from '../components/Photo.vue'
import Video from '../components/Video.vue'
import Merch from '../components/Merch.vue'
// import AudioPlayer from '../components/AudioPlayer.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/discography', name: 'Discography', component: Discography },
  { path: '/concerts', name: 'Concerts', component: Concerts },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/album/:id', name: 'Album', component: Album },
  { path: '/photo', name: 'Photo', component: Photo },
  { path: '/video', name: 'Video', component: Video },
  { path: '/merch', name: 'Merch', component: Merch } //тут была запятая, но пока без нее
  // { path: '/audio-player', name: 'AudioPlayer', component: AudioPlayer }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

// ОТЛАДКА
// console.log('🔄 ПЕРЕСОЗДАНИЕ РОУТЕРА!')
// router.getRoutes().forEach(route => {
//   console.log(`🛣️ ${route.path} → ${route.name}`)
// })

// router.beforeEach((to, from) => {
//   console.log('📍 Переход:', from.path, '→', to.path, 'Params:', to.params)
// })

export default router