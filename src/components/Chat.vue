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
      <div style="display:grid; grid-template-columns: minmax(auto, 300px) minmax(auto, 300px); gap:20px">
        <div
          style="
            padding: 4px;
            border: 1px black solid;
            border-radius: 20px;
            background-color: #ffff;
            margin-block: 10px;
            display: flex;
          "
          v-for="client in clients" :key="client.dni"
        >
            <p>{{client.name}} {{client.surname}}</p>
            <b-button variant="outline-dark" v-b-modal="'chat-entrenador-' + client.dni">Chat</b-button >
            <b-modal
              :id="'chat-entrenador-' + client.dni"
              :title="client.name + ' ' + client.surname"
              ok-only
              @show="mostrarChat(client.dni)"
            >
                  <div>
                      <div id="status" style="text-align: right;">
                        <b-button class="btn btn-dark" v-if="tipo=='Entrenador'" @click="crearContrato(client.dni)">Crear Contrato</b-button>
                      </div>
                      <div id="chat">
                          <br>
                          <div class="card">
                              <div id="messages" class="card-block">
                                  <ul>
                                      <li style="list-style: none;" v-for="message of chat.messages" :key="message.id">
                                        <p :style="posicion_mensaje(message.sender)">
                                          {{ message.text }}
                                        </p>
                                      </li>
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

<script>
import { io } from 'socket.io-client';
export default {
  data: function data() {
    return {
      tipo: '',
      clients: [],
      peticiones: {
        headers: null,
        url: "",
        post: null,
      },
      chat: {
        text: '',
        messages: [],
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
    this.clients = response.data;
    console.log(this.clients);

    
  },
  methods: {    
    posicion_mensaje(dni){
      if(this.$cookies.get("user").dni==dni){
        return "text-align: end;"
      }
      return "text-align: start;"
    },
    async mostrarChat(dni){
      this.chat = {
        text: '',
        messages: [],
      }
      let cliente = "";
      let entrenador = "";
      if (this.tipo == "Entrenador") {
        this.peticiones.url = "chat/client/" + dni + "/trainer/" + this.$cookies.get("user").dni;
        cliente = dni;
        entrenador = this.$cookies.get("user").dni;
      } else if (this.tipo == "Deportista") {
        this.peticiones.url = "chat/client/" + this.$cookies.get("user").dni + "/trainer/" + dni;
        cliente = this.$cookies.get("user").dni;
        entrenador = dni;
      }
      let response = await this.$store.getters.llamada_api(
        this.peticiones.url,
        "GET",
        null,
        this.peticiones.headers
      );
      this.chat.messages = response.data;

      if(this.socket!=null){
        this.socket.disconnect();
      };
      this.socket = io(this.$store.getters.hostname(), { forceNew: true });
      console.log(this.socket);
      console.log('chat-client/' + entrenador + '/' + cliente);
      this.socket.on('chat-client/' + entrenador + '/' + cliente, (data) => {
        this.receivedMessage(data);
      });
    },
     sendMessage(dni) {
       if(this.validateInput){
         const now = new Date();
         let data = "";
        if (this.tipo == "Entrenador") {
        data = {
           dni_client: dni,
           dni_trainer: this.$cookies.get("user").dni,
           sender: this.$cookies.get("user").dni,
           text: this.chat.text,
           date_time: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()),
         };
        } else if (this.tipo == "Deportista") {
          data = {
           dni_client: this.$cookies.get("user").dni,
           dni_trainer: dni,
           sender: this.$cookies.get("user").dni,
           text: this.chat.text,
           date_time: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()),
          };
        }
         console.log(data)
         this.socket.emit('chat-server', data);
         this.chat.text = "";          
       }
    },
    receivedMessage(message) {
      console.log(message);
      this.chat.messages.push(message)
      console.log(this.chat);
    },
    validateInput() {
      return this.chat.text.length > 0
    },
    crearContrato(dni){
      console.log(dni);
      this.$router.push({ 
        name: 'crearContrato', 
        params: {dni_client: dni }
      });
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