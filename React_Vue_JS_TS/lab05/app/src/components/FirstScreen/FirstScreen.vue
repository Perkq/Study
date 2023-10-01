<template>
    <div class="firstScr">
       <!-- <div> -->
        <!-- <p class="text1">
            Complete cloud enablement has arrived.
            </p>
            <p class="text2">
                Oversee, secure, and scale your cloud with one solution.
            </p>
       </div> -->
       <div class="text">
        <textButtonBlock v-bind:objectForText="objectForText" ></textButtonBlock>

       </div>

        <!-- <div>
            <MyButton class="button2">Schedule Demo</MyButton>
        </div> -->
        <div>
            <img class="img1" src="assets/Fisrt1.svg">
            <img class="img2" src="assets/Fisrt2.svg">
            <img class="img3" src="assets/Fisrt3.svg">
            <img class="img4" src="assets/Fisrt4.svg">
        </div>
            <logoList v-bind:logo_list="logo_list"/>       
        </div>
</template>

<script>
import textButtonBlock from "../TextButtonBlock.vue";
import logoList from "./logoList.vue";
//import MyButton from "../MyButton.vue";///
export default{
    name:"FirstScreen",
    components:{
        logoList,textButtonBlock //MyButton,
        },

    data(){
        return{
            logo_list:[
                {id:1, src:"assets/logo1.svg"},
                {id:2, src:"assets/logo2.svg"},
                {id:3, src:"assets/logo3.svg"},
                {id:4, src:"assets/logo4.svg"},
                {id:5, src:"assets/logo5.svg"},
            ],
            objectForText: {
                id: 1,
                title: "Complete cloud enablement has arrived.",
                description:
                "Oversee, secure, and scale your cloud with one solution.",
                textButton: "Request Demo"
      },
        }
    },    
}
</script>

<style>

@import './firstScr.css';

</style>