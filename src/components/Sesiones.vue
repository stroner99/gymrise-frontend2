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
      <div v-if="sesiones.length == 0">
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
              grid-template-columns: minmax(200px,auto) minmax(45px, auto) 80px;
              border-bottom: black solid 1px;
            "
          >
            <p style="padding-right: 9px; border-right: 1px gray solid">
              {{ sesion.title }}
            </p>
            <p style="padding-right: 9px; border-right: 1px gray solid">
              {{ sesion.date }} / {{ sesion.time }}
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
            style="margin-inline: 30px"
            variant="outline-dark"
            v-b-modal="'modal-detalles-' + sesion.id"
              >Ver Detalles</b-button
            >
            <b-modal
              :id="'modal-detalles-' + sesion.id"
              :title="sesion.title"
              ok-only
            >
              <p>Entrenador: {{sesion.name}} {{sesion.surname}}</p>
              <p>Detalles: {{ sesion.description }}</p>
              <p>Fecha: {{ sesion.date }}</p>
              <p>Hora {{ sesion.time }}</p>
              <p>Precio: {{ sesion.price }}€</p>
            </b-modal>
            <b-button
              style="margin-inline: 30px;"
              variant="outline-primary"
              @click="inscribirseSesion(sesion.id)"
              >Inscribirse en la Sesión</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function data() {
    return {
      sesiones: [],
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
    this.peticiones.url = "training-session/available/client/" + this.$cookies.get("user").dni;
    let response = await this.$store.getters.llamada_api(
      this.peticiones.url,
      "GET",
      this.peticiones.post,
      this.peticiones.headers
    );
    console.log(response);
    if (response.status == "200") {
      for (var elem of response.data) {
        var sesion = elem;
        var time_date = this.$store.getters.separar_fecha(sesion.date_time);
        sesion.date = time_date[0];
        sesion.time = time_date[1];
        this.sesiones.push(sesion);
      }
    }
  },
  components: {
  },
  methods: {
    inscribirseSesion(sesion_id) {
      this.peticiones.url =
        "training-session/session/" +
        sesion_id +
        "/client/" +
        this.$cookies.get("user").dni;
      this.peticiones.post = {
        id: sesion_id,
        dni: this.$cookies.get("user").dni,
      };
      let response = this.$store.getters.llamada_api(
        this.peticiones.url,
        "POST",
        this.peticiones.post,
        this.peticiones.headers
      );
      this.sesiones = this.sesiones.filter(function(item){
          return item.id !== sesion_id;
        });
    },
  },
  computed: {},
};
</script>

<style scoped>
p {
  margin-right: 10px;
}
</style>