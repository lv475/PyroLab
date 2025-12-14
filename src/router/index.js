

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue'),
    meta: {
      title: 'Pyrokinesis | Фанатский портал',
      description: 'Дискография, тексты песен, концерты, фото и видео Pyrokinesis в одном месте. Полный архив творчества исполнителя.'
    }
  },
  {
    path: '/discography',
    name: 'Discography',
    component: () => import('../components/Discography.vue'),
    meta: {
      title: 'Дискография Pyrokinesis | Все альбомы и тексты песен',
      description: 'Полная дискография Pyrokinesis: все альбомы, синглы и тексты песен с возможностью онлайн-прослушивания.'
    }
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: () => import('../components/Album.vue'),
    meta: {
      title: 'Альбом | Pyrokinesis',
      description: 'Треки и тексты песен альбома Pyrokinesis. Слушайте онлайн и читайте тексты.'
    }
  },
  {
    path: '/photo',
    name: 'Photo',
    component: () => import('../components/Photo.vue'),
    meta: {
      title: 'Фотогалерея Pyrokinesis | Архивные и концертные фото',
      description: 'Эксклюзивная фотогалерея Pyrokinesis. Архивные фото, концертные снимки, студийные работы. Хронология творчества.'
    }
  },
  {
    path: '/videos',
    name: 'Videos',
    component: () => import('../components/Video.vue'),
    meta: {
      title: 'Видео Pyrokinesis | Клипы, концерты, интервью',
      description: 'Все видео Pyrokinesis: музыкальные клипы, концертные записи, интервью и бэкстейдж. Смотрите онлайн.'
    }
  },
  {
    path: '/video/:id',
    name: 'VideoDetail',
    component: () => import('../components/VideoDetail.vue'),
    meta: {
      title: 'Видео | Pyrokinesis',
      description: 'Смотреть видео Pyrokinesis онлайн. Клипы, концертные выступления и эксклюзивные материалы.'
    }
  },
  {
    path: '/merch',
    name: 'Merch',
    component: () => import('../components/Merch.vue'),
    meta: {
      title: 'Мерч Pyrokinesis | Официальная атрибутика',
      description: 'Официальный мерч Pyrokinesis: футболки, худи, аксессуары. Архивные и актуальные коллекции.'
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../components/Product.vue'),
    meta: {
      title: 'Товар | Мерч Pyrokinesis',
      description: 'Официальный мерч Pyrokinesis. Детальное описание товара, фотографии, информация о покупке.'
    }
  },
  {
    path: '/concerts',
    name: 'Concerts',
    component: () => import('../components/Concerts.vue'),
    meta: {
      title: 'Концерты Pyrokinesis | Афиша 2025',
      description: 'Расписание концертов Pyrokinesis 2025. Даты, города, афиши. Купить билеты на официальном сайте.'
    }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../components/Favorites.vue'),
    meta: {
      title: 'Избранное | Pyrokinesis',
      description: 'Ваши избранные треки и видео Pyrokinesis. Персональная коллекция любимого контента.'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue'),
    meta: {
      title: 'Регистрация | Pyrokinesis',
      description: 'Создать аккаунт на фанатском портале Pyrokinesis. Получите доступ к персональным функциям.'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    redirect: '/register'
  }
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

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'Pyrokinesis'
  }
  
  next()
})

export default router