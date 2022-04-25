
<template>
  <div id="dialog">
    <!--  -->
    <div class="border">
      <p> 
        Detalles: {{sesion.description}}
      </p>
      <p>
        Fecha: {{sesion.date}}
      </p>
      <p>
        Precio: {{sesion.price}}€
      </p>
      <b-button style="width: 100%" @click="onSubmit"
                >Cerrar</b-button>
      
    </div>
  </div>
</template>

<script>
export default {
  data: function data() {
    return {
      peticiones: {
        headers: null,
        url: "",
        post: null,
      },
      sesion: "",
    };
  },
  async created(){
    this.peticiones.headers = {
      headers: {
        Authorization: "Bearer " + this.$cookies.get("token"),
      },
    };
    this.peticiones.url = "training-session/" + this.sesion_id;
    let response = await this.$store.getters.llamada_api(
      this.peticiones.url,
      "GET",
      this.peticiones.post,
      this.peticiones.headers
    );
    if(response.status==200){
      this.sesion = response.data;
    }

  },
  methods: {
    onSubmit(event) {
      this.$emit("click");
    },
  },
  computed: {
  },
  props: {
    sesion_id: String,
  },
  components: {},
};
</script>
 
<style scoped>
#dialog {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
}

.border {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  width: 80%;
  min-width: 300px;
  max-width: 900px;
  height: auto;
  max-height: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: auto;
}

select,
input {
  margin-left: 0px !important;
  margin-right: 0px !important;
}

td,
th {
  align-items: center;
  padding-left: 15px;
  padding-right: 2px;
}

li{
  color:#ff5500;
}

p {
  color: #000000;
  text-align: justify;
}

.form {
  margin: 0px;
  text-align: right;
}

.centrar {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.form-control {
  border-radius: 50px;
  margin: 10px;
}

.custom-select {
  border-radius: 50px;
  margin: 10px;
}

.espacio {
  height: 10px;
}

.boton_accion {
  border-radius: 10px;
  background: #ff5500;
}
</style>
