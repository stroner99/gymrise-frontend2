<template>
  <div>
    <div
      style="
        margin: 50px auto auto;
        display: flex;
        justify-content: center;
        padding: 25px;
        max-width: 700px;
        background-color: #fcfeff73;
        border-radius: 30px;
      "
    >
      <b-form style="width: 100%; max-width: 650px" @submit="onSubmit">
        <h1 style="display: flex; justify-content: center">Registro</h1>
        <br />
        <h3>¿Qué tipo de cuenta deseas?</h3>
        <br />
        <b-form-select
          v-model="datos.tipo"
          :options="tipo"
          style="
            border-radius: 30px;
            padding-inline: 20px;
            padding-block: 3px;
            font-size: 20px;
            margin-left: 50px;
            width: 200px;
          "
          required
        ></b-form-select>
        <br />
        <br />
        <h3>Introduce tus datos</h3>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Nombre:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.name"
              type="text"
              placeholder="Nombre"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Apellidos:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.surname"
              type="text"
              placeholder="Apellidos"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>DNI/NIF:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.dni"
              type="text"
              placeholder="DNI/NIF"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Contraseña:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.password"
              type="password"
              placeholder="Contraseña"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Repite la Contraseña:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.rpassword"
              type="password"
              placeholder="Repite la Contraseña"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Email:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.email"
              type="email"
              placeholder="Email"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Descripción:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.description"
              type="text"
              placeholder="Descripción"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div v-if="datos.tipo == 'Deportista'">
          <div
            style="
              display: grid;
              grid-template-columns: 200px 120px 110px 120px;
            "
          >
            <p>Altura(cm):</p>
            <b-form-group style="margin-block: 10px; width: 100%">
              <b-form-input
                style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
                v-model="datos.height"
                type="number"
                placeholder="Altura (cm)"
                required
              ></b-form-input>
            </b-form-group>
            <p>Peso(Kg):</p>
            <b-form-group style="margin-block: 10px; width: 100%">
              <b-form-input
                style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
                v-model="datos.weight"
                type="number"
                placeholder="Peso (Kg)"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: 200px 120px 110px 120px;
            "
          >
            <p>Sexo:</p>
            <b-form-group style="margin-block: 10px; width: 100%">
              <b-form-select
                v-model="datos.sex"
                :options="sex"
                required
                style="
                  border-radius: 30px;
                  padding-inline: 20px;
                  padding-block: 4px;
                  width: 100%;
                "
              ></b-form-select>
            </b-form-group>
            <p>Edad:</p>
            <b-form-group style="margin-block: 10px; width: 100%">
              <b-form-input
                style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
                v-model="datos.age"
                type="number"
                placeholder="Edad"
                required
                min="1"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <b-button
          type="submit"
          style="
            margin-top: 20px;
            margin-left: 200px;
            display: flex;
            width: 350px;
            justify-content: center;
          "
          >Registrarse</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function data() {
    return {
      datos: {
        name: "",
        surname: "",
        dni: "",
        password: "",
        rpassword: "",
        email: "",
        description: "",
        height: "",
        weight: "",
        sex: "",
        age: "",
        tipo: "Entrenador",
      },
      sex: [],
      tipo: ["Entrenador", "Deportista"],
      peticiones: {
        headers: null,
        url: "",
        post: null,
      },
    };
  },
  async created(){
    this.peticiones.url = "sex";
    let response = await this.$store.getters.llamada_api(
      this.peticiones.url,
      "GET",
      this.peticiones.post,
      this.peticiones.headers
    );
    this.sex=response.data;
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();

      this.peticiones.headers = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
      };

      if (this.datos.tipo == "Entrenador") {
        this.peticiones.post = {
          name: this.datos.name,
          surname: this.datos.surname,
          dni: this.datos.dni,
          password: this.datos.password,
          email: this.datos.email,
          description: this.datos.description,
        };
        this.peticiones.url = "personal-trainer/add";

      } else if (this.datos.tipo == "Deportista") {
        this.peticiones.post = {
          name: this.datos.name,
          surname: this.datos.surname,
          dni: this.datos.dni,
          password: this.datos.password,
          email: this.datos.email,
          description: this.datos.description,
          height: this.datos.height,
          weight: this.datos.weight,
          sex: this.datos.sexo,
          age: this.datos.age,
        };
        this.peticiones.url = "client/add";
      }

      let response = await this.$store.getters.llamada_api(
        this.peticiones.url,
        "POST",
        this.peticiones.post,
        this.headers
      );

      if(response.status=="201")
        window.location.href = "/login";
        
    },
  },
  computed: {},
};
</script>

<style scoped>
p {
  margin-right: 10px;
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
</style>