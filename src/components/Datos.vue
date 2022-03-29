<template>
  <div>
    <div class="fondo_img"></div>
    <div class="fondo"></div>
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
        <h3>Tus datos</h3>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Nombre:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.name"
              type="text"
              placeholder="Nombre"
              required
              disabled
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
              disabled
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
              disabled
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
            <p>Altura:</p>
            <b-form-group style="margin-block: 10px; width: 100%">
              <b-form-input
                style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
                v-model="datos.height"
                type="number"
                placeholder="Altura (cm)"
                required
              ></b-form-input>
            </b-form-group>
            <p>Peso:</p>
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
        <div style="display: flex">
          <b-button
            @click="borrar"
            style="
              margin-top: 20px;
              margin-left: 10px;
              display: flex;
              width: 180px;
              justify-content: center;
              background-color: red;
            "
            >Borrar Cuenta</b-button
          >
          <b-button
            type="submit"
            style="
              margin-top: 20px;
              margin-left: 10px;
              display: flex;
              width: 350px;
              justify-content: center;
            "
            >Actualizar Datos</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
//Cuando sepa como funcionan las urls hacer un create con el axios para recuperar
module.exports = {
  data: function data() {
    return {
      datos: {
        name: "Sergi",
        surname: "Velló Cardús",
        dni: "20087876K",
        email: "sergivello@gmail.com",
        description: "Las patatas describen mi vida",
        height: "172",
        weight: "52.6",
        sex: "Hombre",
        age: "22",
        tipo: "Deportista",
      },
      sex: ["Hombre", "Mujer", "Otro"],
      tipo: ["Entrenador", "Deportista"],
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.datos.tipo == "Entrenador") {
        post = {
          name: this.name,
          surname: this.surname,
          dni: this.dni,
          password: this.password,
          email: this.email,
          description: this.description,
        };
        //prueba de axios
        await this.axios
          .get("https://api.coindesk.com/v1/bpi/currentprice.json")
          .then((result) => {
            console.log(result.data);
          });
        window.location.href = "/login";
      } else if (this.datos.tipo == "Deportista") {
        post = {
          name: this.name,
          surname: this.surname,
          dni: this.dni,
          password: this.password,
          email: this.email,
          description: this.description,
          height: this.height,
          weight: this.weight,
          sex: this.sex,
          age: this.age,
        };
        window.location.href = "/login";
      }
    },
    async borrar() {
      this.$cookies.set("user", "", "1h");
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