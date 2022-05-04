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
      "
    >
      <b-form style="width: 100%; max-width: 650px" @submit="onSubmit">
        <h3>Tus datos</h3>
        <div
          style="
            display: grid;
            grid-template-columns: 100px minmax(auto, 350px);
          "
        >
          <p>Nombre:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.name"
              type="text"
              placeholder="Nombre"
              required
              disabled
            ></b-form-input>
          </b-form-group>
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: 100px minmax(auto, 350px);
          "
        >
          <p>Apellidos:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.surname"
              type="text"
              placeholder="Apellidos"
              required
              disabled
            ></b-form-input>
          </b-form-group>
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: 100px minmax(auto, 350px);
          "
        >
          <p>DNI/NIF:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.dni"
              type="text"
              placeholder="DNI/NIF"
              required
              disabled
            ></b-form-input>
          </b-form-group>
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: 100px minmax(auto, 350px);
          "
        >
          <p>Email:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.email"
              type="email"
              placeholder="Email"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: 100px minmax(auto, 350px);
          "
        >
          <p>Descripción:</p>
          <b-form-group style="margin-block: 10px; width: 100%">
            <b-form-input
              style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
              v-model="datos.description"
              type="text"
              placeholder="Descripción"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div style="display: grid; grid-template-columns: auto auto;" v-if="tipo == 'Entrenador'">
          <div v-for="skill in skills" :key="skill">
            <input type="checkbox" :id="skill" :value="skill" v-model="skills_selected">
            <label style="font-weight: bold;" class="input-helper input-helper--checkbox" :for="skill">{{skill}}</label>
          </div>
        </div>
        <div v-if="tipo == 'Deportista'">
          <div
            style="
              display: grid;
              grid-template-columns: 100px minmax(65px, 120px) minmax(50px,110px) minmax(65px, 120px);
            "
          >
            <p>Altura:</p>
            <b-form-group style="margin-block: 10px; width: 100%">
              <b-form-input
                style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
                v-model="datos.height"
                type="number"
                placeholder="Altura (cm)"
                required
              ></b-form-input>
            </b-form-group>
            <p>Peso:</p>
            <b-form-group style="margin-block: 10px; width: 100%">
              <b-form-input
                style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
                v-model="datos.weight"
                type="number"
                placeholder="Peso (Kg)"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: 100px minmax(65px, 120px) minmax(50px,110px) minmax(65px, 120px);
            "
          >
            <p>Sexo:</p>
            <b-form-group style="margin-block: 10px; width: 100%">
              <b-form-select
                v-model="datos.sex"
                :options="sex"
                required
                style="
                  border-radius: 30px;
                  padding-inline: 20px;
                  padding-block: 4px;
                  width: 100%;
                "
              ></b-form-select>
            </b-form-group>
            <p>Edad:</p>
            <b-form-group style="margin-block: 10px; width: 100%">
              <b-form-input
                style="border-radius: 20px; border: 1px solid rgb(0 0 0 / 50%)"
                v-model="datos.age"
                type="number"
                placeholder="Edad"
                required
                min="1"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: auto auto; gap: 30px;">
          <b-button
            @click="borrar"
            variant="danger"
            >Borrar Cuenta</b-button
          >
          <b-button
            type="submit"
            variant="outline-dark"
            >Actualizar Datos</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>

export default {
  
  data: function data() {
    return {
      tipo: "",
      datos: {
        name: "",
        surname: "",
        dni: "",
        email: "",
        description: "",
        height: "",
        weight: "",
        sex: "",
        age: "",
      },
      sex: ["Hombre", "Mujer", "Otro"],
      tipo: ["Entrenador", "Deportista"],
      peticiones:{
        headers: null,
        url: "",
        post: null,
      },
      skills: [],
      skills_first: [],
      skills_selected: []
      
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
      this.peticiones.url = "personal-trainer/skills/all";
      let response_s = await this.$store.getters.llamada_api(
        this.peticiones.url,
        "GET",
        this.peticiones.post,
        this.peticiones.headers
      );
      this.peticiones.url = "personal-trainer/skills/" + this.$cookies.get("user").dni;
      this.skills = response_s.data;
      let response_sf = await this.$store.getters.llamada_api(
        this.peticiones.url,
        "GET",
        this.peticiones.post,
        this.peticiones.headers
      );
      this.skills_first = response_sf.data;
      this.skills_selected = this.skills_first;
      this.peticiones.url = "personal-trainer/" + this.$cookies.get("user").dni;
    } else if (this.tipo == "Deportista") {
      this.peticiones.url = "sex";
      let response_s = await this.$store.getters.llamada_api(
        this.peticiones.url,
        "GET",
        this.peticiones.post,
        this.peticiones.headers
      );
      this.sex=response_s.data;
      this.peticiones.url = "client/" + this.$cookies.get("user").dni;
    }

    let response = await this.$store.getters.llamada_api(
      this.peticiones.url,
      "GET",
      null,
      this.peticiones.headers
    );

    this.datos = {
      name: response.data.name,
      surname: response.data.surname,
      dni: response.data.dni,
      email: response.data.email,
      description: response.data.description,
      height: response.data.height,
      weight: response.data.weight,
      sex: response.data.sex,
      age: response.data.age,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.tipo == "Entrenador") {
        for(var elem of this.skills){
          if(this.skills_selected.includes(elem) && !this.skills_first.includes(elem)){
            this.peticiones.url = "personal-trainer/add/" + this.$cookies.get("user").dni + "/skill/" + elem;
            this.peticiones.post = {};
            let response = await this.$store.getters.llamada_api(
              this.peticiones.url,
              "POST",
              this.peticiones.post,
              this.peticiones.headers
            );
          }
          else if(!this.skills_selected.includes(elem) && this.skills_first.includes(elem)){
            this.peticiones.url = "personal-trainer/delete/" + this.$cookies.get("user").dni + "/skill/" + elem;
            this.peticiones.post = {};
            let response = await this.$store.getters.llamada_api(
              this.peticiones.url,
              "DELETE",
              this.peticiones.post,
              this.peticiones.headers
            );
          }
        }
        this.peticiones.post = {
          name: this.datos.name,
          surname: this.datos.surname,
          description: this.datos.description,
        };
        this.peticiones.url = "personal-trainer/update/" + this.datos.dni;
      } else if (this.tipo == "Deportista") {
        this.peticiones.post = {
          name: this.datos.name,
          surname: this.datos.surname,
          description: this.datos.description,
          height: this.datos.height,
          weight: this.datos.weight,
          sex: this.datos.sex,
          age: this.datos.age,
        };
        this.peticiones.url = "client/update/" + this.datos.dni;
      }
      let response = await this.$store.getters.llamada_api(
        this.peticiones.url,
        "PUT",
        this.peticiones.post,
        this.peticiones.headers
      );

    },
    async borrar() {
      var url = "";
      if (this.tipo == "Deportista") {
        url = "client/delete/02937847K";
      } else if (this.tipo == "Entrenador") {
        url = "personal-trainer/delete/02937847K";
      }

      let response = await this.$store.getters.llamada_api(
        url,
        "DELETE",
        null,
        this.peticiones.headers
      );
      if ((response.status = 200)) {
        this.$cookies.set("user", "", "1h");
        window.location.href = "/login";
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
.fondo_input {
  background-color: rgba(255, 255, 255, 0.4);
  z-index: -1;
}
 .input-helper { 
    position: relative; 
    display: inline-block; 
    margin-bottom: 5px; 
} 
 
.input-helper:before { 
    content: ''; 
    display: block; 
    position: absolute; 
} 
 
.input-helper--checkbox { 
    padding-left: 20px; 
} 
 
.input-helper--checkbox:before { 
    top: 6px;
    left: 0;
    width: 15px;
    height: 15px;
    border: 1px solid #52a259;
    background-color: white;
    border-radius: 5px;
} 
 
input[type=checkbox] { 
    display: none; 
} 
 
input[type=checkbox]:checked + label:before { 
    background: #52a259; 
} 
</style>