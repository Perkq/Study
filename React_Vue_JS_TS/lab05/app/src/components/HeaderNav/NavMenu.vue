<template>
    <ul>
      <NavMenuItem
          v-for="MenuItem of MenuItems" :key='MenuItem.id'
          v-bind:MenuItem = 'MenuItem'
      />
    </ul>
  
  </template>
  
  <script>
  import NavMenuItem from './NavMenuItem.vue';
  
  export default {
    props:['MenuItems'],
    name: "NavMenu",
    components: {
      NavMenuItem
    },
  }
  </script>
  
<style scoped>

@import './navMenu.css';

</style>