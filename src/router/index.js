import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TestView from '@/views/TestView.vue'
import WordsView from '@/views/WordsView.vue'
import { decodeUserIdFromToken } from '@/scripts/auth'
import CategoryWordsView from '@/views/CategoryWordsView.vue'
import MoviesView from '@/views/MoviesView.vue'
import WordsCategoriesView from '@/views/WordsCategoriesView.vue'
import WordsLearn from '@/views/WordsLearn.vue'
import WordsRepeat from '@/views/WordsRepeat.vue'
import WordsStats from '@/views/WordsStats.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { authForbidden: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { authForbidden: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
    },
    {
      path: '/words',
      name: 'words',
      component: WordsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/words/categories',
      name: 'categories',
      component: WordsCategoriesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/words/learn',
      name: 'learn_words',
      component: WordsLearn,
      meta: { requiresAuth: true },
    },
    {
      path: '/words/repeat',
      name: 'repeat_words',
      component: WordsRepeat,
      meta: { requiresAuth: true },
    },
    {
      path: '/words/stats',
      name: 'words_stats',
      component: WordsStats,
      meta: { requiresAuth: true },
    },
    {
      path: '/words/category/:category_id',
      name: 'category',
      component: CategoryWordsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView,
      meta: { requiresAuth: false },
    },
  ],
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const authForbidden = to.meta.authForbidden
  const user_id = decodeUserIdFromToken()

  if (!user_id && requiresAuth) {

    next({ name: 'login' })
  }

  if (user_id && authForbidden) {

    next({ name: 'home' })
  }

  next()

})

export default router
