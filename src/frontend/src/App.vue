<template>
  <tabla :encabezado='["Id","Nombre","Rol","Pelicula","Descripcion","Botones"]'
  :claves="['id','nombre','rol','pelicula','descripcion']"
  :info="contenidoPersonajes" />

  <tabla :encabezado='["Id","Nombre","Edad","Nacionalidad","Premios","Botones"]'
  :claves="['id','nombre','edad','nacionalidad','premios']"
  :info="contenidoActores" />

  <formulario-personajes
  :labels='["Nombre","Rol","Pelicula","Descripcion"]'
   />
</template>

<script setup>
import tabla from './components/tabla.vue';
import formularioPersonajes from './components/formularioPersonajes.vue' 
import { ref } from 'vue';
import axios from 'axios';


const contenidoPersonajes=ref([]);
const contenidoActores=ref([]);


async function cambiar() {

const options1 = {
    
    method :'GET',
    url:"http://localhost:3000/api/selectTablas/personajes",
    Headers:{
        'Content-Type':'application/json',
    },
}

const options2 = {
    
    method :'GET',
    url:"http://localhost:3000/api/selectTablas/actores",
    Headers:{
        'Content-Type':'application/json',
    },
}
try{
    const response = await axios.request(options1)
    const response2 = await axios.request(options2)

    console.log(response.data);
    console.log(response2.data);

    contenidoPersonajes.value=response.data;
    contenidoActores.value=response2.data;
    //return response.data
}
    catch(error){
        console.error("error",error)
        return [{}]
    }
    
}

cambiar();

</script>