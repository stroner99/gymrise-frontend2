<template>
  <div style="display: flex; flex-direction: column">
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
            <b-nav-item v-if="this.$cookies.get('tipo')=='Deportista'" :to="{ name: 'sesion' }">Sesiones</b-nav-item>
            <b-nav-item v-if="this.$cookies.get('tipo')=='Deportista'" :to="{ name: 'monitores' }">Monitores</b-nav-item>
            <b-nav-item :to="{ name: 'contratos' }">Contratos</b-nav-item>
            <b-nav-item @click="salir">Salir</b-nav-item>
          </b-navbar-nav>
        </b-container>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
module.exports = {
  data: function data() {
    return {};
  },
  methods: {
    salir() {
      this.$cookies.set("tipo", "", "1h");
      this.$cookies.set("token", "", "1h");
      this.$cookies.set("user", "", "1h");
      window.location.href = "/login";
    },
  },
  computed: {},
  components: {},
};
</script>