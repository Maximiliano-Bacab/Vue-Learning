<template>
  <div class="container">
    <div class="card">
      <div class="left-side"></div>
      <div class="right-side">
        <h2>Registrarse</h2>
        <form @submit.prevent="Enviar()" @input="Validacion()">
          <div :class="{ InError: errores.name }">
            <label for="nombre">Nombre:</label>
            <label v-if="errores.name"> El nombre no puede estar vacío</label>
            <input type="text" id="nombre" v-model="name" @input="ValName()" required /><br /><br />
          </div>

          <div :class="{ InError: errores.email }">
            <label for="correo">Correo:</label>
            <label v-if="errores.email"> {{ errores.email_message }}</label>
            <input
              type="email"
              id="correo"
              v-model="email"
              :class="{ InError: errores.email }"
              @input="ValEmail()"
              required
            /><br /><br />
          </div>

          <div :class="{ InError: errores.password }">
            <label for="contraseña">Contraseña:</label>
            <label v-if="errores.password"> La contraseña no debe estar vacía</label>
            <input
              type="password"
              id="contraseña"
              v-model="password"
              :class="{ InError: errores.password }"
              @input="ValPass()"
              required
            /><br /><br />
          </div>

          <div :class="{ InError: errores.group }">
            <label for="grupo">Grupo escolar:</label>
            <label v-if="errores.group"> El grupo no puede estar vacío</label>
            <input
              type="text"
              id="grupo"
              v-model="group"
              :class="{ InError: errores.group }"
              @input="ValGroup()"
              required
            /><br /><br />
          </div>

          <button type="submit" :disabled="enable">Enviar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//IMPORTACIONES
import type IUser from '@/interfaces/IUser'
import UserService from '@/services/UserService'
import type { Ref } from 'vue' //Interfaz de reactividad (ref)
import { ref } from 'vue' //Función de reactividad

//INGRESO DE LAS VARIABLES
const name: Ref<string> = ref('')
const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const group: Ref<string> = ref('')
const enable: Ref<boolean> = ref(true)
const Service = new UserService()

//ERRORES
const errores = ref({
  name: false,
  email: false,
  password: false,
  group: false,
  email_message: ''
})

//VALIDACIONES
const ValName = () => {
  if (name.value.trim() == '' || name.value.length <= 0) {
    errores.value.name = true
  } else {
    errores.value.name = false
  }
}

const ValEmail = () => {
  if (email.value.trim() == '' || email.value.length <= 0) {
    errores.value.email = true
    errores.value.email_message = 'El correo no puede estar vacío'
  } else if (!email.value.includes('@')) {
    errores.value.email = true
    errores.value.email_message = ' El correo debe contener un @'
  } else {
    errores.value.email = false
    errores.value.email_message = ''
  }
}

const ValPass = () => {
  if (password.value.trim() == '' || password.value.length <= 0) {
    errores.value.password = true
  } else {
    errores.value.password = false
  }
}

const ValGroup = () => {
  if (group.value.trim() == '' || group.value.length <= 0) {
    errores.value.group = true
  } else {
    errores.value.group = false
  }
}

const Validacion = () => {
  if (
    name.value.trim() != '' &&
    email.value.trim() != '' &&
    password.value.trim() != '' &&
    group.value.trim() != '' &&
    Object.values(errores.value).every((error) => !error)
  ) {
    enable.value = false
  } else {
    enable.value = true
  }
}

const Enviar = async () => {
  const MiUser: IUser = {
    name: name.value,
    email: email.value,
    password: password.value,
    group: group.value
  }

  await Service.postUser(MiUser)
}
</script>

<style scoped>
.InError input {
  border: 2px solid rgb(255, 0, 0);
}

.InError input:focus {
  border: none;
  outline: 2px solid red;
}

.InError label {
  color: red;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.card {
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 0 20px 5px rgba(0, 189, 126, 0.644);
  width: 50%;
}

.left-side {
  flex: 1.5;
  --s: 200px;
  --c1: #1d1d1d;
  --c2: #4e4f51;
  --c3: #3c3c3c;

  background:
    repeating-conic-gradient(from 30deg, #0000 0 120deg, var(--c3) 0 180deg) calc(0.5 * var(--s))
      calc(0.5 * var(--s) * 0.577),
    repeating-conic-gradient(from 30deg, var(--c1) 0 60deg, var(--c2) 0 120deg, var(--c3) 0 180deg);
  background-size: var(--s) calc(var(--s) * 0.577);
}

.right-side {
  flex: 2;
  padding: 4rem;
  background-color: rgba(97, 97, 97, 0.12);
}

.right-side h2 {
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input {
  width: 90%;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 1rem;
}

input:focus {
  outline: 2px solid rgba(0, 189, 126, 0.856);
}

button {
  width: 90%;
  padding: 10px 20px;
  background-color: rgba(0, 189, 126, 0.856);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: rgba(6, 104, 71, 0.856);
}

button:disabled {
  background-color: rgba(20, 63, 49, 0.856);
  cursor: not-allowed;
}
</style>
