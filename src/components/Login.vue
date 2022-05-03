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
      <b-form style="width: 100%; max-width: 450px">
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
          <p class="titulo_form_2">Email:</p>
          <b-form-input
            class="inputs"
            v-model="user"
            type="text"
            placeholder="Email"
            required
          ></b-form-input>

          <p class="titulo_form_2">Contraseña:</p>
          <b-form-group invalid-feedback="Usuario o contraseña incorrecta">
            <b-form-input
              class="inputs"
              v-model="password"
              type="password"
              placeholder="Contraseña"
              :state="invalidPassword"
              required
            ></b-form-input>
          </b-form-group>

          <div style="grid-column: 1/3">
            <b-form-group label="Eres:" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                v-model="selected"
                :options="options"
                :aria-describedby="ariaDescribedby"
                name="plain-inline"
                plain
                required
              ></b-form-radio-group>
            </b-form-group>
          </div>
          <b-button @click="registrarse" class="boton_acceder"
            >Registrarse</b-button
          >
          <b-button @click="login" class="boton_acceder">Acceder</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default  {
  data: function data() {
    return {
      user: "",
      password: "",
      selected: "Deportista",
      options: [
        { text: "Deportista", value: "Deportista" },
        { text: "Entrenador", value: "Entrenador" },
      ],
      invalid: {
        password: null,
      },
    };
  },
  methods: {
    async login() {
      var post = {
        email: this.user,
        password: this.password,
        role: this.selected.toUpperCase(),
      };
      let response = await this.$store.getters.llamada_api("auth/login", "POST", post);
      if(response.status=='201'){
          this.$cookies.set("user", response.data, "12h");
          this.$cookies.set("tipo", this.selected, "12h");
          this.$cookies.set("token", response.data.accessToken, "12h");
          window.location.href = "/datos";

      } else {
        this.invalid.password = false;
      }
    },
    registrarse(event) {
      event.preventDefault();
      window.location.href = "/registrarse";
    },
  },
  computed: {
    invalidPassword() {
      return this.invalid.password;
    },
  },
};
</script>

<style scope>
input,
button {
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
