<template>
  <div class="product">
    <div>
      <p class="h1">{{ objectForText.title }}</p>
      <p class="h3">{{ objectForText.description }}</p>
    </div>
     <div>
        <MyButton class="buttonProduct">{{ objectForText.textButton }}</MyButton>
      </div>




  </div>
</template>
<script>
import MyButton from "./MyButton.vue";///

export default {
  name: "TextButtonBlock",
  props: ["objectForText"],
  components:{
        MyButton,
        },
};
</script>
<style>

@import './textButton.css';
</style>
