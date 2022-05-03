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
      <div v-if="trainers.length==0">
        <h2>No hay entrenadores</h2>
      </div>
      <div v-for="trainer in trainers" :key="trainer.dni">
        <div
          style="
            padding: 4px;
            border: 1px black solid;
            border-radius: 20px;
            background-color: #ffff;
            margin-block: 10px;
          "
        >
          <div style="display: flex; border-bottom: solid 1px #cacaca;">
            <p style="margin-inline: auto;">
              {{ trainer.name }} {{ trainer.surname }}
            </p>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: minmax(100px, auto) minmax(100px, auto);
              margin-block: 6px;
              gap: 20px;
            "
          >
            <b-button variant="outline-dark" v-b-modal="'modal-entrenador-' + trainer.dni"
              >Ver Detalles</b-button
            >
            <b-modal
              :id="'modal-entrenador-' + trainer.dni"
              :title="trainer.name + ' ' + trainer.surname"
              ok-only
            >
              <p>Detalles: {{ trainer.description }}</p>
              <p>Email: {{ trainer.email }}</p>
            </b-modal>
            <b-button variant="outline-dark" v-b-modal="'modal-sesion-' + trainer.dni"
              >Ver Sesiones</b-button
            >
            <b-modal
              :id="'modal-sesion-' + trainer.dni"
              :title="trainer.name + ' ' + trainer.surname"
              @show="sesion(trainer.dni)"
              ok-only
            >
              <div v-if="sesiones.length==0">
                <h2>No tiene sesiones</h2>
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
                      {{ sesion.date }}  {{sesion.time}}
                    </p>
                    <p style="justify-content: left">{{ sesion.price }}€</p>
                  </div>
                  <div
                    style="
                      display: grid;
                      grid-template-columns: minmax(100px, auto) minmax(100px,auto);
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
            </b-modal>
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
      trainers: [],
      sesiones: [],
      peticiones: {
        headers: null,
        url: "",
        post: null,
      },
    };
  },
  async created() {
    this.peticiones.headers = {
      headers: {
        Authorization: "Bearer " + this.$cookies.get("token"),
      },
    };
    this.peticiones.url = "personal-trainer";
    let response = await this.$store.getters.llamada_api(
      this.peticiones.url,
      "GET",
      this.peticiones.post,
      this.peticiones.headers
    );
    console.log(response.data);
    this.trainers = response.data;
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.tipo == "Entrenador") {
        post = {
          name: this.name,
          surname: this.surname,
          dni: this.dni,
          password: this.password,
          email: this.email,
          description: this.description,
        };
        //prueba de axios
        url = "http://localhost:3000/client/update/" + this.dni;
        this.axios.post(url, post).then((result) => {
          if (result.data == "200") {
            window.location.href = "/datos";
          } else {
            console.log(result.data);
          }
        });
        window.location.href = "/login";
      } else if (this.tipo == "Deportista") {
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
        url = "http://localhost:3000/personal-trainer/update/" + this.dni;
        this.axios.post(url, post).then((result) => {
          if (result.data == "200") {
            window.location.href = "/datos";
          } else {
            console.log(result.data);
          }
        });
        window.location.href = "/login";
      }
    },
    async sesion(trainer_dni) {
      this.sesiones = [];
      this.peticiones.url =
        "training-session/available/" +
        trainer_dni +
        "/client/" +
        this.$cookies.get("user").dni;
      let response = await this.$store.getters.llamada_api(
        this.peticiones.url,
        "GET",
        this.peticiones.post,
        this.peticiones.headers
      );
      if (response.status == 200) {
        for (var elem of response.data) {
          var sesion = elem;
          var time_date = this.$store.getters.separar_fecha(sesion.date_time);
          sesion.date = time_date[0];
          sesion.time = time_date[1];
          this.sesiones.push(sesion);
        }
      }
      console.log(response);
    },
    async borrar() {
      if (this.tipo == "Entrenador") {
        url = "http://localhost:3000/client/delete/" + this.dni;
        this.axios.delete(url).then((result) => {
          if (result.data == "200") {
            this.$cookies.set("user", "", "1h");
            window.location.href = "/login";
          } else {
            console.log(result.data);
          }
        });
      } else if (this.tipo == "Deportista") {
        url = "http://localhost:3000/personal-trainer/delete/" + this.dni;
        this.axios.delete(url).then((result) => {
          if (result.data == "200") {
            this.$cookies.set("user", "", "1h");
            window.location.href = "/login";
          } else {
            console.log(result.data);
          }
        });
      }
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