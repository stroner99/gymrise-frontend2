<template>
  <div>
    <div class="fondo_img"></div>
    <div class="fondo"></div>
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      "
    >
      <br />
      <h2 style="display: flex; justify-content: center">
        <b>Accede a tu cuenta</b>
      </h2>
      <br />
      <b-form style="width: 100%; max-width: 450px" @submit="onSubmit">
        <div
          class="fondo_input"
          style="
            padding: 20px;
            border-radius: 20px;
            display: grid;
            grid-template-columns: auto auto;
            column-gap: 10px;
            row-gap: 15px;
          "
        >
          <p class="titulo_form_2">Usuario:</p>
          <b-form-input
            class="inputs"
            v-model="user"
            type="text"
            placeholder="Email"
          ></b-form-input>

          <p class="titulo_form_2">Contraseña:</p>
          <b-form-input
            class="inputs"
            v-model="password"
            type="password"
            placeholder="Contraseña"
          ></b-form-input>
          <b-button @click="registrarse" class="boton_acceder"
            >Registrarse</b-button
          >
          <b-button type="submit" class="boton_acceder">Acceder</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function data() {
    return {
      user: "",
      password: "",
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      post = {
        email: this.user,
        password: this.password
      }
      //post creado para luego hacer el axio
      if (this.user == "admin" && this.password == "admin") {
        this.$cookies.set("user", this.user, "1h");
        window.location.href = "/datos";
      }
    },
    registrarse(event) {
      event.preventDefault();
      window.location.href = "/registrarse";
    },
  },
  computed: {},
};
</script>

<style scope>
input, button {
  border-radius: 20px !important;
}
p {
  margin-left: auto !important;
  margin-block: auto !important;
  font-weight: bold;
}
.fondo_img {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url("../assets/fondo_gym.jpg");
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
  background-color: rgba(0, 0, 0, 0.2);
  z-index: -9;
}
.fondo_input { 
  background-color: rgba(255, 255, 255, 0.4);
  z-index: -1;
}
</style>
