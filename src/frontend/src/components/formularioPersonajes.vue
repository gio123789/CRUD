<template>
  <form @submit.prevent="Insertar">
    <div v-for="titulo in labels" >
      <label>
        {{ titulo }}
      </label>
      <input type="text" v-model="json[titulo]" />
    </div>
    <button type="submit">
      Insertar
    </button>
  </form>
</template>

<script setup>

import axios from 'axios';

let json = {
  Id: "",
  Nombre: "",
  Rol: "",
  Pelicula: "",
  Descripcion: "",
};

const props = defineProps(['labels']);

const Insertar = async () => {
console.log(json);
  const options = {
    method: 'POST',
    url: "http://localhost:3000/api/insertarPersonajes",
    headers: {
      'Content-Type': 'application/json',
    },
    data: json/* {
      id:Id,
      nombre:Nombre,
      rol:Rol,
      pelicula:Pelicula,
      descripcion:Descripcion,
    }, */
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error("Error", error);
  }
};
</script>
