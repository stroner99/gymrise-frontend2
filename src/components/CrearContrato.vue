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
          <p>Título:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="title"
              type="text"
              placeholder="Título"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Día que empieza:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-datepicker
              v-model="date_s"
              class="mb-2"
              locale="es"
              :min="min_d"
            ></b-form-datepicker>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: 200px 350px">
          <p>Día que termina:</p>
          <b-form-group 
            style="margin-block: 10px; width: 100%"
            invalid-feedback="Tienes que crear la sesión con más antelación">
            <b-form-datepicker
              v-model="date_e"
              class="mb-2"
              locale="es"
              :min="min_d"
              :state="comprobarDia()"
            ></b-form-datepicker>
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
          @click="crearContrato()"
          >Crear Contrato</b-button
        > 
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    return {
      title: "",
      description: "",
      price: 0,
      date_s: "",
      date_e: "",
      min_d: minDate,
      peticiones: {
        headers: null,
        url: "",
        post: null,
      },
    };
  },
  methods: {
    async crearContrato() {
      //falla el tema del time y el date
      this.peticiones.headers = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
      };
      this.peticiones.post = {
        start_date: this.$store.getters.unir_fecha("00:00:00", this.date_s),
        end_date: this.$store.getters.unir_fecha("00:00:00", this.date_e),
        title: this.title,
        description: this.description,
        price: this.price,
        dni_trainer: this.$cookies.get("user").dni,
        dni_client: this.$route.params.dni_client,
        accepted: false
      };
      this.peticiones.url = "contract/add"
      console.log(this.peticiones.post);
      let response = await this.$store.getters.llamada_api(
        this.peticiones.url,
        "POST",
        this.peticiones.post,
        this.peticiones.headers
      );
      console.log(response);
      if(response.status==201){
        window.location.href = "/misContratos";
      }
      //falta meter algún mensaje de error si ocurre otra cosa
    },
    comprobarDia() {

      if (this.date_e!="" && this.date_s>this.date_e) {
          return false;
        
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