<template>
  <div>
    <header>
      <div class="header">
        <div class="logo">
          <img src="assets/logo_icon.svg">
          <img src="assets/logo_text.svg">

        </div>
        <div>
          <NavMenu class="menu" v-bind:MenuItems = 'MenuItems'></NavMenu>

        </div>
        <!-- <div class="nav">
          <ul>
            <li><a href="#">Product</a></li>
            <li><a href="#">Resources</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div> -->


        <button class="bnt_search">
          <img src="assets/search_icon.svg">
        </button>
        <MyButton class="header_btn">Schedule Demo</MyButton>
      </div>
    </header>
  </div>
</template>


<script>
import NavMenu from './NavMenu.vue';
import MyButton from '../MyButton.vue';
export default{
  components:{
    MyButton, NavMenu
  },
  data(){
    return{
      MenuItems:[
        {id:1, title: "Product"},
        {id:2, title: "Resources"},
        {id:3, title: "Support"},
        {id:4, title: "About"}
      ]
    }
}
}
</script>

<style scoped>
@import './header.css';

</style>