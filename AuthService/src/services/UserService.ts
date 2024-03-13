//IMPORTACIONES DE ARCHIVOS
import type IUser from '@/interfaces/IUser' //Interfaz
import type { Ref } from 'vue' //Interfaz de reactividad (ref)
import { ref } from 'vue' //Función de reactividad

//OBTENCIÓN DE INFORMACIÓN DEL ENV
const url = import.meta.env.VITE_API_URL || 'http://172.16.107.202:3000'

//CREACIÓN DE VARIABLES
const Cabeceras = new Headers({
  //Cabecera para el POST
  Accept: 'application/JSON',
  'Content-type': 'application/JSON'
})

//DECLARACIÓN Y EXPORTACION DE LA CLASE "UserService"
export default class UserService {
  //Datos reactivos
  private users: Ref<IUser[]>
  private user: Ref<IUser>

  //Inicialización de los datos
  constructor() {
    this.users = ref([])
    this.user = ref({}) as Ref<IUser>
  }

  getUsers(): Ref<IUser[]> {
    return this.users
  }

  getUser(): Ref<IUser> {
    return this.user
  }

  async fetchAll(): Promise<void> {
    try {
      const json = await fetch(url + '/Users')
      const response = await json.json()
      this.users.value = await response
    } catch (error) {
      //Agrega aqui lo que necesites
      console.log(error)
    }
  }

  async fetchUser(email: string): Promise<void> {
    try {
      const json = await fetch(url + '/Users/' + email)
      const response = await json.json()
      this.user.value = await response
    } catch (error) {
      console.log(error)
    }
  }

  async postUser(user: IUser): Promise<void> {
    try {
      const postUser = new Request(url + '/Register', {
        method: 'POST',
        headers: Cabeceras,
        body: JSON.stringify(user)
      })
      const response = await fetch(postUser)
      const json = await response.json()
      alert(`El tipo de 'json.data' es: ${typeof json.data}`)
      alert(json.data)
    } catch (error) {
      alert('El usuario no pudo ser ingresado' + error)
    }
  }
}
