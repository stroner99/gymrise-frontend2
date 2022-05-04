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
      <div v-if="clients.length==0">
        <h2>No hay chats</h2>
      </div>
      <div v-for="client in clients" :key="client.dni" style="display:grid; grid-template-columns: minmax(auto, 300px) minmax(auto, 300px); gap:20px">
        <div
          style="
            padding: 4px;
            border: 1px black solid;
            border-radius: 20px;
            background-color: #ffff;
            margin-block: 10px;
            display: flex;
          "
        >
            <p>{{client.name}} {{client.surname}}</p>
            <b-button variant="outline-dark" v-b-modal="'chat-entrenador-' + client.dni">Chat</b-button >
            <b-modal
              :id="'chat-entrenador-' + client.dni"
              :title="client.name + ' ' + client.surname"
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
                          <b-button style="padding-inline:25px; margin-left: 10px" variant="dark" @click.prevent="sendMessage(client.dni)">Enviar</b-button>
                          </div>
                      </div>
                  </div>
            </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="/socket.io/socket.io.js"></script>
<script>
import { io } from 'socket.io-client';
export default {
  data: function data() {
    return {
      clients: [{name: "to", surname:"prueba", dni:"10100101L"}],
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
      }
    };
  },
  async created() {
this.tipo = this.$cookies.get("tipo");
    this.peticiones.headers = {
      headers: {
      Authorization: "Bearer " + this.$cookies.get("token"),
      },
    };
    if (this.tipo == "Entrenador") {
      this.peticiones.url = "chat/trainer/" + this.$cookies.get("user").dni;
    } else if (this.tipo == "Deportista") {
      this.peticiones.url = "chat/client/" + this.$cookies.get("user").dni;
    }

    let response = await this.$store.getters.llamada_api(
      this.peticiones.url,
      "GET",
      null,
      this.peticiones.headers
    );
    // this.clients = response.data;
    
  },
  methods: {    
    mostrarChat(){
      
      this.chat.socket_server = io('http://localhost:3000/chat-server', 
      {
        extraHeaders: {
              Authorization: "Bearer " + this.$cookies.get("token")
            }
      }
      );
      this.chat.socket_client = io('http://localhost:3000/chat-client', 
      {
        extraHeaders: {
              Authorization: "Bearer " + this.$cookies.get("token")
            }
      }
      );
      this.chat.socket_server.on('msgToClient', (message) => {
        this.receivedMessage(message)
      })
    },
     sendMessage(trainer_dni) {
      const now = new Date();
      var mes = now.getMonth() + 1;
      var fecha = now.getFullYear() + "-" + mes + "-" + now.getDate();
      var hora = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
      if(this.validateInput()) {
        const message = {
        date_time: this.$store.getters.unir_fecha(hora, fecha),
        dni_trainer: trainer_dni,
        dni_client: this.$cookies.get("user").dni,
        text: this.chat.text
      }
      console.log(trainer_dni);
      console.log(message);
      this.chat.socket_client.emit('msgToServer', message)
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