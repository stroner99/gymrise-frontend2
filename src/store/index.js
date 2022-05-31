import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

const hostname = 'http://localhost:3000';
// const hostname = 'https://gymrise-backend.herokuapp.com/';

export default new Vuex.Store({
  getters: {
    hostname: (state) => () => {
      return hostname;
    },
    llamada_api: (state) => async (path, method, post, headers) => {
      console.log(path)
      console.log(method);
      console.log(post);
      console.log(headers);
      let response;
      if (path == "")
        return "";
      var url = hostname + "/" + path;
      console.log(url);
        switch (method) {
          case 'GET':
            if (headers)
              await axios.get(url, headers)
              .then(function (r) {
                response = r;
              })
              .catch(function(e){
                response = e
              });
            else
              await axios.get(url)
              .then(function (r) {
                response = r;
              })
              .catch(function(e){
                response = e
              });
            break;
          case 'POST':
            if (headers)
              await axios.post(url, post, headers)
              .then(function (r) {
                response = r;
              })
              .catch(function(e){
                response = e
              });
            else
              await axios.post(url, post)
              .then(function (r) {
                response = r;
              })
              .catch(function(e){
                response = e
              });
            break;
          case 'PUT':
            if (headers)
              await axios.put(url, post, headers)
              .then(function (r) {
                console.log(r);
                console.log("p")
                response = r;
              })
              .catch(function(e){
                response = e
              });
            else
              await axios.put(url, post)
              .then(function (r) {
                response = r;
              })
              .catch(function(e){
                response = e
              });
            break;
          case 'DELETE':
            if (headers)
              await axios.delete(url, headers)
              .then(function (r) {
                response = r;
              })
              .catch(function(e){
                response = e
              });
            else
              await axios.delete(url)
              .then(function (r) {
                response = r;
              })
              .catch(function(e){
                response = e
              });
            break;
          default:
            break;
        }
      console.log(response);
      return response;
    },
    unir_fecha: (state) => (tiempo, fecha) => {
      return fecha + "T" + tiempo + ".000Z";
    },
    separar_fecha: (state) => (fecha_unido) => {
      var fecha = fecha_unido.substring(0, 10);
      var tiempo = fecha_unido.substring(11, 19);
      return [fecha, tiempo];
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
