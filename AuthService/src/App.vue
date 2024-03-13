<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <button><RouterLink to="/"> Home </RouterLink></button>
        <button><RouterLink to="/about"> About </RouterLink></button>
        <button><RouterLink to="/blog"> Blog </RouterLink></button>
        <button><RouterLink to="/register"> Registro </RouterLink></button>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  background-color: #333;
  color: white;
}

.wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}

nav {
  display: flex;
  justify-content: center;
}

button {
  color: white;
  text-decoration: none;
  font-size: 25px;
  border: none;
  background: none;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  margin-left: 4rem;
}

button::before {
  margin-left: auto;
}

button::after,
button::before {
  content: '';
  width: 0%;
  height: 2px;
  background: hsla(160, 100%, 37%, 1);
  display: block;
  transition: 0.5s;
}

button:hover::after,
button:hover::before {
  width: 100%;
}
</style>
