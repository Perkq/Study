<template>
  <li>
    <a v-bind:href="'#' + MenuItem.title" v-on:click="scroll">
      {{MenuItem.title}}
    </a>
    
  </li>
</template> 

<script>
export default {
  props: {
    MenuItem:{
      type: Object,
      required:true
    },
    
  },
  methods:{
    scroll() {
      const anchors = document.querySelectorAll('a[href*="#"]')
    for (let anchor of anchors){
      anchor.addEventListener("click",function(event){
      event.preventDefault();
      const blockID = anchor.getAttribute('href')
      document.querySelector('' + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
      })
    })
  }
      
    }
  }
  

}
</script>

<style scoped>
 @import './navMenuLi.css';
</style>