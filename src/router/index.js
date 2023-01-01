import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from "@/views/auth/LoginView.vue";
import SignupView from "@/views/auth/SignupView.vue";
import CreatePlaylistView from "@/views/playlists/CreatePlaylistView.vue";
import PlaylistDetailsView from "@/views/playlists/PlaylistDetailsView.vue"
import { projectAuth } from "../firebase/config"

// auth guard function - redirects users who are NOT signed/logged in
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in authGuard is: ', user);
  if (!user) {
    next({name: "LoginView"})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView
  },
  {
    path: '/playlists/create',
    name: 'CreatePlaylistView',
    component: CreatePlaylistView,
    beforeEnter: requireAuth
  },
  {
    path: '/playlists/:id',
    name: 'PlaylistDetailsView',
    component: PlaylistDetailsView,
    beforeEnter: requireAuth,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
