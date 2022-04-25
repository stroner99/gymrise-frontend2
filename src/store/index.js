import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    llamada_api: (state) => async (path, method, post, headers) => {
      console.log(path)
      console.log(method);
      console.log(post);
      console.log(headers);
      let response;
      if (path == "")
        return "";
      // var url = "http://localhost:3000/" + path;
      var url = "http://localhost:3000/" + path;
      switch (method) {
        case 'GET':
          if (headers)
            response = await axios.get(url, headers);
          else
            response = await axios.get(url);
          break;
        case 'POST':
          if (headers)
            response = await axios.post(url, post, headers);
          else
            response = await axios.post(url, post);
          break;
        case 'PUT':
          if (headers)
            response = await axios.put(url, post, headers);
          else
            response = await axios.put(url, post);
          break;
        case 'DELETE':
          if (headers)
            response = await axios.delete(url, headers);
          else
            response = await axios.delete(url);
          break;
        default:
          break;
      }
      return response;
    },
    autorizacion: function () {
      console.log("prueba");
      return "patata";
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
