<template>
  <div>
    <h2><label>Titulo: </label>{{ user.name }}</h2>
    <h2><label>Cuerpo: </label>{{ user.email }}</h2>
    <h2><label>Numero: </label>{{ user.group }}</h2>
  </div>
</template>

<script lang="ts" setup>
//IMPORTACIONES
import { useRoute } from 'vue-router'
import UserService from '@/services/UserService'
import { onMounted } from 'vue'

const service = new UserService()
const user = service.getUser()

onMounted(async () => {
  const router = useRoute()
  const userEmail = router.params.email as string
  await service.fetchUser(userEmail)
})
</script>

<style scoped></style>
