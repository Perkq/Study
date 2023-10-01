<template>
  <div class="all">
    <TheHeader></TheHeader>
    <FisrtScreen></FisrtScreen>
    <secondBlock></secondBlock>
    <thirdBlock></thirdBlock>
    <FourthBlock></FourthBlock>
    <FifthBlock></FifthBlock>
    <SixthBlock></SixthBlock>
    <TheFooter></TheFooter>
  </div>
</template>
<script>
import TheHeader from './components/HeaderNav/TheHeader.vue';
import FisrtScreen from './components/FirstScreen/FirstScreen.vue';
import secondBlock from "@/components/SecondBlock/SecondBlock.vue";
import thirdBlock from "@/components/ThirdBlock/ThirdBlock.vue";
import FourthBlock from "@/components/FourthBlock/FourthBlock.vue";
import FifthBlock from "@/components/FifthBlock/FiffthBlock.vue"
import SixthBlock from '@/components/SixthBlock/SixthBlock.vue';
import TheFooter from "@/components/FooterBlock/TheFooter.vue"
export default {
  name: 'App',
  components: {
    TheHeader, FisrtScreen, secondBlock, thirdBlock, FourthBlock, FifthBlock, SixthBlock, TheFooter
  },
  
}
</script>

<style>
body{
  margin: auto;
  padding: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
