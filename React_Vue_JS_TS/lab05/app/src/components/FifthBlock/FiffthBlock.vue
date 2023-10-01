<template>
    
    <h1>Built For</h1>
    <logoList v-bind:logo_list="logo_list"/> 

</template>

<script>
import logoList from "@/components/FirstScreen/logoList.vue";
export default {
    name: 'FifthBlock',
    components: {
        logoList
    },
    data(){
        return{
            logo_list:[
                {id:1, src:"assets/logo6.svg"},
                {id:2, src:"assets/logo7.svg"},
                {id:3, src:"assets/logo8.svg"},
            ]}}
}
</script>

<style>
@import './fifthBL.css';
</style>