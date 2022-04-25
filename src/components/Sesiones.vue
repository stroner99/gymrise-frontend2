<template>
  <div>
    <div class="fondo_img"></div>
    <div class="fondo"></div>
    <div v-if="mostrar.verDetalles">
      <verdetalles @click="cerrarPopUp" :sesion_id="mostrar.sesion_id"></verdetalles>
    </div>
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
      <div v-if="sesiones == []">
        <h2>No hay sesiones</h2>
      </div>
      <div v-for="sesion in sesiones" :key="sesion.id">
        <div
          style="
            padding: 4px;
            border: 1px black solid;
            border-radius: 20px;
            background-color: #ffff;
            margin-block: 10px;
          "
        >
          <div
            style="
              display: grid;
              grid-template-columns: 100px minmax(45px, auto) 80px;
              border-bottom: black solid 1px;
            "
          >
            <p style="padding-right: 9px; border-right: 1px gray solid">
              {{ sesion.description }}
            </p>
            <p style="padding-right: 9px; border-right: 1px gray solid">
              {{ sesion.date }}
            </p>
            <p style="justify-content: left">{{ sesion.price }}€</p>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: minmax(100px, auto) minmax(100px, auto);
              margin-block: 6px;
            "
          >
            <b-button
              style="margin-inline: 30px; background-color: #a54646"
              @click="verdetalles(sesion.id)"
              ><b-icon icon="arrow-down-circle" color="#0000"></b-icon> &nbsp;
              Ver detalles</b-button
            >
            <b-button
              style="margin-inline: 30px; background-color: #a54646"
              @click="inscribirseSesion(sesion.id)"
              ><b-icon icon="arrow-down-circle" color="#0000"></b-icon> &nbsp;
              Inscribirse en la Sesión</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import verdetalles from "./PopuupVerDetalles.vue";
export default {
  data: function data() {
    return {
      sesiones: [
        {
          id: 0,
          date: "2022-03-15T00:00:00.000Z",
          time: "1970-01-01T15:20:09.000Z",
          dni: "string",
          description: "descrip",
          price: 10,
        },
      ],
      mostrar: {
        verDetalles: false,
        sesion_id: "",
      },
      peticiones: {
        headers: null,
        url: "",
        post: null,
      },
    };
  },
  async created() {
    // falla el 403
    //falta mejorar el current para que solo salga los que están ahora y no ha contrato el cliente
    this.peticiones.headers = {
      headers: {
        Authorization: "Bearer " + this.$cookies.get("token"),
      },
    };
    this.peticiones.url = "training-session/current";
    let response = await this.$store.getters.llamada_api(
      this.peticiones.url,
      "GET",
      this.peticiones.post,
      this.peticiones.headers
    );
    console.log(response);
    if (response.status == "200") {
      this.sesiones = response.data;
    }
  },
  components: {
    verdetalles,
  },
  methods: {
    inscribirseSesion(sesion_id) {
      //mirar lo del time y el date
      this.peticiones.url = "training-session/session/" + sesion_id + "/client/" + this.$cookies.get("user").dni;
      this.peticiones.post = {

      }
      let response = this.$store.getters.llamada_api(
        this.peticiones.url,
        "POST",
        this.peticiones.post,
        this.peticiones.headers
      );
      if (response.status == 200) {
        window.location.href = "/misSesiones";
      }
    },
    verdetalles(sesion_id) {
      this.mostrar.sesion_id = sesion_id;
      this.mostrar.verDetalles = true;
    },
    cerrarPopUp(){
      this.mostrar.verDetalles = false;
    }
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