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
      <div v-if="contratos.length == 0">
        <h2>No hay contratos</h2>
      </div>
      <div v-for="contrato in contratos" :key="contrato.id">
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
              grid-template-columns: 100px minmax(150px,auto) minmax(45px, auto) 50px;
              border-bottom: black solid 1px;
              gap: 5px
            "
          >
          <div style="display: flex; flex-direction: column; justify-content: center;padding-inline: 9px; border-right: 1px gray solid">
            <b-badge v-if="contrato.accepted==null" style="color: black; background-color: yellow; border-radius: 10px;">Pendiente</b-badge>
            <b-badge v-else-if="contrato.accepted==false" style="color: #f8f9fa; background-color: red; border-radius: 10px;">Rechazado</b-badge>
            <b-badge v-else-if="contrato.accepted==true" style="color: #f8f9fa; background-color: #28a745; border-radius: 10px;">Confirmado</b-badge>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: center;padding-right: 9px; border-right: 1px gray solid">
            <p>
              {{ contrato.title }}
            </p>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: center;padding-right: 9px; border-right: 1px gray solid">
            <p>
              {{ contrato.date_s }} / {{ contrato.date_e }}
            </p>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: center;">
            <p style="justify-content: left">{{ contrato.price }}€</p>
          </div>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns:  minmax(100px, auto) minmax(100px, auto) minmax(100px, auto);
              margin-block: 6px;
            "
          >
            <b-button variant="outline-danger" @click="aceptarSesion(contrato, false)" v-if="tipo=='Deportista' && contrato.accepted==null">Rechazar</b-button>
            <b-button variant="outline-danger" @click="borrarSesion(contrato.id)" v-else-if="tipo=='Entrenador' && contrato.accepted==null">Borrar Sesión</b-button>
            <div v-else><p> </p></div>
            <b-button variant="outline-dark" v-b-modal="'modal-detalles-' + contrato.id"
              >Ver Detalles</b-button
            >
            <b-modal
              :id="'modal-detalles-' + contrato.id"
              :title="contrato.title"
              ok-only
            >
              <p v-if="tipo=='Entrenador'">Deportista: {{contrato.name_client}} {{contrato.surname_client}}</p>
              <p v-if="tipo=='Deportista'">Entrenador: {{contrato.name_trainer}} {{contrato.surname_trainer}}</p>
              <p>Detalles: {{ contrato.description }}</p>
              <p>Fecha inicio: {{ contrato.date_s }}</p>
              <p>Fecha fin: {{ contrato.date_e }}</p>
              <p>Precio: {{ contrato.price }}€</p>
            </b-modal>
            <b-button variant="outline-success" @click="aceptarSesion(contrato, true)" v-if="tipo=='Deportista' && contrato.accepted==null">Aceptar</b-button>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="modalConfirmacion" ok-only><h4>{{modalConfirmacionMsg}}</h4></b-modal>
  </div>
</template>

<script>
export default {
  data: function data() {
    return {
      contratos: [],
      peticiones: {
        headers: null,
        url: "",
        post: null,
      },
      tipo: "",
      modalConfirmacion: false,
      modalConfirmacionMsg: "",

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
    this.tipo = this.$cookies.get("tipo");
    if (this.tipo == "Deportista") {
      this.peticiones.url = "contract/client/" + this.$cookies.get("user").dni;
    } else if ((this.tipo = "Entrenador")) {
      this.peticiones.url = "contract/trainer/" + this.$cookies.get("user").dni;
    }
    let response = await this.$store.getters.llamada_api(
      this.peticiones.url,
      "GET",
      this.peticiones.post,
      this.peticiones.headers
    );
    console.log(response);
    if (response.status == "200") {
      for (var elem of response.data) {
        var contrato = elem;
        var time_date_s = this.$store.getters.separar_fecha(
          contrato.start_date
        );
        contrato.date_s = time_date_s[0];
        contrato.time_s = time_date_s[1];
        var time_date_e = this.$store.getters.separar_fecha(contrato.end_date);
        contrato.date_e = time_date_e[0];
        contrato.time_e = time_date_e[1];
        this.contratos.push(contrato);
      }
      console.log(this.contratos);
    }
  },
  components: {
  },
  methods: {
    baja(contrato_id) {
      //mirar lo del time y el date
      this.peticiones.url = "contract/delete/" + contrato_id;
      let response = this.$store.getters.llamada_api(
        this.peticiones.url,
        "POST",
        this.peticiones.post,
        this.peticiones.headers
      );
      if (response.status == 200) {
        window.location.href = "/contratos";
      }
    },
    aceptarSesion(contrato, aceptado) {
      this.peticiones.url = "contract/update/" + contrato.id + '/' + aceptado;
      let response = this.$store.getters.llamada_api(
        this.peticiones.url,
        "PUT",
        this.peticiones.post,
        this.peticiones.headers
      );
      // if(response.status==200){
        this.modalConfirmacion = true;
        if(aceptado){
          this.modalConfirmacionMsg = "Has aceptado el contrato " + contrato_id;
        }
        else{
          this.modalConfirmacionMsg = "Has rechazado el contrato " + contrato_id;
        }
        contrato.accepted = aceptado;
      // }
    },
    borrarSesion(contrato_id) {
      this.peticiones.url =
        "contract/delete/" + contrato_id;
      let response = this.$store.getters.llamada_api(
        this.peticiones.url,
        "DELETE",
        this.peticiones.post,
        this.peticiones.headers
      );
      // if(response.status==200){
        this.contratos = this.contratos.filter(function(item){
            return item.id !== contrato_id;
          });
        this.modalConfirmacion = true;
        this.modalConfirmacionMsg = "Se ha borrado el contrato" + contrato_id;
      // }
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