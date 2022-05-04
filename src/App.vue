<template>
  <div style="display: flex; flex-direction: column">
    <div class="fondo_img"></div>
    <div class="fondo"></div>
    <b-navbar
      v-if="this.$route.path != '/login' && this.$route.path != '/registrarse'"
      toggleable="md"
      type="dark"
      variant="dark"
    >
      <b-navbar-brand disabled style="margin-left: 20px">
        Hola {{ this.$cookies.get("user").name }}</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-container>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'datos' }">Perfil</b-nav-item>
            <b-nav-item :to="{ name: 'misSesiones' }">Mis Sesiones</b-nav-item>
            <b-nav-item v-if="this.$cookies.get('tipo')=='Entrenador'" :to="{ name: 'crearSesion' }">Crear Sesión</b-nav-item>
            <b-nav-item v-if="this.$cookies.get('tipo')=='Deportista'" :to="{ name: 'sesion' }">Sesiones Disponibles</b-nav-item>
            <b-nav-item v-if="this.$cookies.get('tipo')=='Deportista'" :to="{ name: 'monitores' }">Monitores</b-nav-item>
            <b-nav-item :to="{ name: 'misContratos' }">Mis Contratos</b-nav-item>
            <b-nav-item v-if="this.$cookies.get('tipo')=='Entrenador'" :to="{ name: 'crearContrato' }">Crear Contrato</b-nav-item>
            <b-nav-item v-b-modal="'notificaciones'">Notificaciones</b-nav-item>
            <b-nav-item @click="salir">Salir</b-nav-item>
          </b-navbar-nav>
        </b-container>
      </b-collapse>
    </b-navbar>
    <b-modal
      :id="'notificaciones'"
      :title="'Notificaciones'"
      ok-only 
      @show="notificacion()">
        <div v-if="notificaciones.length == 0">
          <h2>No tienes notificaciones</h2>
        </div>
        <div v-for="notificacion in notificaciones" :key="notificacion.id" style="display:flex; border-bottom: solid 1px #d5d5d5;">
            <p>{{notificacion.date}} &nbsp; {{notificacion.time}}  &nbsp;</p>
            <p>{{notificacion.text}}</p>
            <b-button
              style="margin-inline: 30px;"
              variant="outline-danger"
              @click="borrar(notificacion.id)"
              >Borrar</b-button
            >
        </div>
    </b-modal>
    <router-view />
  </div>
</template>

<script>
module.exports = {
  data: function data() {
    return {
      notificaciones: [],
      peticiones: {
        headers: null,
        url: "",
        post: null,
      },
    };
  },
  methods: {
    salir() {
      this.$cookies.set("tipo", "", "1h");
      this.$cookies.set("token", "", "1h");
      this.$cookies.set("user", "", "1h");
      window.location.href = "/login";
    },
    async notificacion(){
      this.peticiones.headers = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
      };
      this.peticiones.url =
        "notifications/client/" +  this.$cookies.get("user").dni;
      let response = await this.$store.getters.llamada_api(
        this.peticiones.url,
        "GET",
        this.peticiones.post,
        this.peticiones.headers
      );
       if (response.status == 200) {
         this.notificaciones = [];
        for (var elem of response.data) {
          var notificacion = elem;
          var time_date = this.$store.getters.separar_fecha(notificacion.date_time);
          notificacion.date = time_date[0];
          notificacion.time = time_date[1];
          this.notificaciones.push(notificacion);
        }
        console.log(this.notificaciones);
      }
    },
    async borrar(notificacion_id){
      this.peticiones.url =
        "notifications/delete/" +  this.$cookies.get("user").dni;
        let response = await this.$store.getters.llamada_api(
        this.peticiones.url,
        "DELETE",
        this.peticiones.post,
        this.peticiones.headers
      );
      this.notificaciones = this.notificaciones.filter(function(item){
          return item.id !== notificacion_id;
      });
    },
  },
  computed: {},
  components: {},
};
</script>

<style scoped>
.fondo_img {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url("./assets/fondo_gym.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.2;
  z-index: -10;
}
.fondo {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -9;
}
</style>