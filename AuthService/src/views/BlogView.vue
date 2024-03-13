<template>
  <section>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <RouterLink :to="{ name: 'post', params: { email: user.email } }">
          {{ index + 1 }} | {{ user.name }}
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
//IMPORTACIONES
import UserService from '@/services/UserService' //Servicio
import type IUser from '@/interfaces/IUser' //Interfaz
import type { Ref } from 'vue' //Interfaz de reactividad (ref)
import { onMounted } from 'vue' //Función de reactividad (ref), Maquetado de la página

//VARIABLES
const service = new UserService() //Funciones del servicio
const users: Ref<IUser[]> = service.getUsers() //Creación de los usuarios

//MAQUETADO DE LA PÁGINA
onMounted(async () => {
  await service.fetchAll() //Obtención de todos los usuarios
})
</script>

<style scoped></style>
