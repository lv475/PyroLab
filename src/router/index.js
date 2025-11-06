import { createRouter, createWebHistory } from 'vue-router' //Импортируем фабрики из vue-router. экземпляр роутера и включение хистори апи

import Home from '../components/Home.vue'
import Discography from '../components/Discography.vue'
import Concerts from '../components/Concerts.vue'
import Favorites from '../components/Favorites.vue'
import Profile from '../components/Profile.vue'
import Album from '../components/Album.vue'
import Photo from '../components/Photo.vue'
import Video from '../components/Video.vue'
import Merch from '../components/Merch.vue'

//таблица маршрутов
const routes = [
  { path: '/', name: 'Home',  component: Home  }, // главная страница
  { path: '/discography', name: 'Discography', component: Discography },  // страница "дискография"
  { path: '/сoncerts', name: 'Concerts', component: Concerts },
  { path: '/favorites', name: 'Favorites', component: Favorites},
  { path: '/profile', name: 'Profile', component: Profile},
  { path: '/album', name: 'Album', component: Album},
  { path: '/photo', name: 'Photo', component: Photo},
  { path: '/video', name: 'Video', component: Video},
  { path: '/merch', name: 'Merch', component: Merch}
]

const router = createRouter({
  history: createWebHistory(), // красивые адреса без #
  routes,  //таблица
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

export default router