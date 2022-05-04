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
        flex-direction: column;
      "
    >
      <b-form>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Titulo:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="title"
              type="text"
              placeholder="Titulo"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Date:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-datepicker
              v-model="date"
              class="mb-2"
              locale="es"
              :min="min_d"
            ></b-form-datepicker>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Time:</p>
          <b-form-group
            style="margin-block: 10px; width: 100%"
            invalid-feedback="Tienes que crear la sesión con más antelación"
          >
            <b-form-timepicker
              v-model="time"
              hide-header
              :state="comprobar_hora()"
            ></b-form-timepicker>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Descripción:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="description"
              type="text"
              placeholder="Descripción"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Precio:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="price"
              type="number"
              min="0"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <b-button
          style="
            margin-top: 20px;
            margin-left: 200px;
            display: flex;
            width: 350px;
            justify-content: center;
          "
          @click="crearSesion()"
          >Crear Sesión</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script>
import store from '@/store';
export default {
  data: function data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    return {
      title: "",
      description: "",
      price: 0,
      time: "",
      date: "",
      min_d: minDate,
      min_h: "",
      hoy: now,
      peticiones: {
        headers: null,
        url: "",
        post: null,
      },
    };
  },
  methods: {
    async crearSesion() {
      //falla el tema del time y el date
      this.peticiones.headers = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
      };
      this.peticiones.post = {
        title: this.title,
        date_time: this.$store.getters.unir_fecha(this.time, this.date),
        description: this.description,
        price: this.price,
        dni: this.$cookies.get("user").dni
      };
      this.peticiones.url = "training-session/add"
      console.log(this.peticiones.post);
      let response = await this.$store.getters.llamada_api(
        this.peticiones.url,
        "POST",
        this.peticiones.post,
        this.peticiones.headers
      );
      console.log(response);
      if(response.status==201){
        window.location.href = "/misSesiones";
      }
      //falta meter algún mensaje de error si ocurre otra cosa
    },
    comprobar_hora() {
      var fecha = this.date.split("-");

      if (
        parseInt(fecha[2], 10) == this.hoy.getDate() &&
        parseInt(fecha[1], 10) - 1 == this.hoy.getMonth() &&
        parseInt(fecha[0], 10) == this.hoy.getFullYear()
      ) {
        var tiempo = this.time.split(":");
        if (parseInt(tiempo[0], 10) <= this.hoy.getHours()) {
          return false;
        }
      }
      return null;
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