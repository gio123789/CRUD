<template>
    <table>
      <thead>
        <tr>
          <th v-for="etiqueta in encabezado" style="border: 1px solid black">
            {{ etiqueta }}
          </th>
        </tr>
        </thead>
      <tbody>
        <tr v-for="inf in info"  style="border: 1px solid black">
          <td v-for="c in claves">{{inf [c]  }}</td>
          <td ><button @click="Eliminar">Eliminar</button><button>Editar</button></td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  const props = defineProps(['encabezado', 'info','claves']);

  const Eliminar = async () => {

  const options = {
    method: 'DELETE',
    url: "http://localhost:3000/api/eliminarPersonaje/12",
    headers: {
      'Content-Type': 'application/json',
    },
    data: json
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error("Error", error);
  }
};
  
  </script>