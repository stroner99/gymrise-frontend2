import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Registrarse from '../components/Registrarse.vue'
import Datos from '../components/Datos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registrarse',
    name: 'registrarse',
    component: Registrarse
  },
  {
    path: '/datos',
    name: 'datos',
    component: Datos
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
