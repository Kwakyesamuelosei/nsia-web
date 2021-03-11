<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>


@font-face {
    font-family: 'Karla';
    src: url('./assets/Karla/Karla-Regular.ttf') format("truetype");
    font-weight:300;
}

#app{
  font-family: 'Karla', sans-serif;
}
</style>
