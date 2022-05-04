<template>
  <div>
    <b-badge>Pendiente</b-badge>

  </div>
</template>

<script>
export default  {
  data: function data() {
    return {
      prueba: true,
      skills_selected: [],
      skills: ["prueba1","prueba2"],
    };
  },
  methods: {
  },
  computed: {
  },
};
</script>

<style scoped>
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
    border-radius: 5px;
} 
 
input[type=checkbox] { 
    display: none; 
} 
 
input[type=checkbox]:checked + label:before { 
    background: #52a259; 
} 
</style>
