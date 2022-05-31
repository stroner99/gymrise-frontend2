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
              @show="getskills(trainer.dni)"
            >
              <p>Detalles: {{ trainer.description }}</p>
              <p>Email: {{ trainer.email }}</p>
              <div v-if="skills.length!=0">
                <p>Skills: </p>
                <p v-for="skill in skills" :key="skill" style="margin-left: 10px !important;">-{{skill}}</p>
              </div>
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
              <b-button variant="outline-dark" v-b-modal="'chat-entrenador-' + trainer.dni"
              >Chat</b-button>
            
            <b-modal
              :id="'chat-entrenador-' + trainer.dni"
              :title="trainer.name + ' ' + trainer.surname"
              ok-only
              @show="mostrarChat()"
            >
                  <div>
                      <div id="status"></div>
                      <div id="chat">
                          <br>
                          <div class="card">
                              <div id="messages" class="card-block">
                                  <ul>
                                      <li v-for="message of chat.messages" :key="message.id">{{ message.name }}: {{ message.text }}</li>
                                  </ul>
                              </div>
                          </div>
                          <br>
                          <div style="display: flex;">
                          <input class="form-control" v-model="chat.text" placeholder="Escribe un mensaje...">
                          <b-button style="padding-inline:25px; margin-left: 10px" variant="dark" @click.prevent="sendMessage(trainer.dni)">Enviar</b-button>
                          </div>
                      </div>
                  </div>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="modalConfirmacion" ok-only><h4>{{modalConfirmacionMsg}}</h4></b-modal>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
export default {
  data: function data() {
    return {
      trainers: [],
      sesiones: [],
      skills: [],
      peticiones: {
        headers: null,
        url: "",
        post: null,
      },
      chat: {
        name: '',
        text: '',
        messages: [],
        socket_server: null,
        socket_client: null,
      },
      modalConfirmacion: false,
      modalConfirmacionMsg: "",
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
    async getskills(trainer_dni){
      this.peticiones.url = "personal-trainer/skills/" + trainer_dni;
      let response = await this.$store.getters.llamada_api(
        this.peticiones.url,
        "GET",
        this.peticiones.post,
        this.peticiones.headers
      );
      this.skills = response.data;
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
      // if(response.status==201){
        this.sesiones = this.sesiones.filter(function(item){
            return item.id !== sesion_id;
          });
          this.modalConfirmacion = true;
         this.modalConfirmacionMsg = "Te has inscrito correctamente a la sesión";
      // }
    },
    mostrarChat(){
      
      // this.chat.socket_server = io('http://localhost:3000/chat-server', 
      // {
      //   extraHeaders: {
      //         Authorization: "Bearer " + this.$cookies.get("token")
      //       }
      // }
      // );
      // this.chat.socket_client = io('http://localhost:3000/chat-client', 
      // {
      //   extraHeaders: {
      //         Authorization: "Bearer " + this.$cookies.get("token")
      //       }
      // }
      // );
      this.chat.socket_client.on('chat-client', (message) => {
        this.receivedMessage(message)
      })
    },
     sendMessage(trainer_dni) {
      const now = new Date();
      var fecha = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate();
      var hora = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
      console.log(this.$store.getters.unir_fecha(hora, fecha));
      if(this.validateInput()) {
        const message = {
        dni_trainer: trainer_dni,
        dni_client: this.$cookies.get("user").dni,
        text: this.chat.text
      }
      console.log(trainer_dni);
      console.log(message);
      // this.chat.socket_server.emit('chat-server', message)
      this.chat.text = ''
      }
    },
    receivedMessage(message) {
      console.log(message);
      this.chat.messages.push(message)
    },
    validateInput() {
      return this.chat.text.length > 0
    }
  },
  computed: {},
};
</script>

<style scoped>
p {
  margin-right: 10px;
}
#messages{
 height:300px;
 overflow-y: scroll;
}
</style>