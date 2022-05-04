import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Registrarse from '../components/Registrarse.vue'
import Datos from '../components/Datos.vue'
import Sesiones from '../components/Sesiones.vue'
import MisSesiones from '../components/MisSesiones.vue'
import Monitores from '../components/Monitores'
import CrearSesion from '../components/CrearSesion.vue'
import MisContratos from '../components/MisContratos.vue'
import CrearContratos from '../components/CrearContrato.vue'
import Chat from '../components/Chat.vue'
import Prueba from '../components/Prueba.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/prueba',
    name: 'prueba',
    component: Prueba
  },
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
  },
  {
    path: '/sesion',
    name: 'sesion',
    component: Sesiones
  },
  {
    path: '/misSesiones',
    name:  'misSesiones',
    component: MisSesiones
  },
  {
    path: '/monitores',
    name: 'monitores',
    component: Monitores
  },
  {
    path: '/crearSesion',
    name: 'crearSesion',
    component: CrearSesion
  },
  {
    path: '/crearContrato',
    name: 'crearContrato',
    component: CrearContratos
  },
  {
    path: '/misContratos',
    name: 'misContratos',
    component: MisContratos
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
