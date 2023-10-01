<template>
    <div class="conteiner">
        <div v-for="logo in logo_list" :key="logo.id">               
            <img v-bind:src="logo.src">
         </div>
    </div>
</template>

<script>
export default{
    name: "logoList",
    props:['logo_list']
}
</script>

<style>
.conteiner{
    display: flex;
    flex-direction: row;
    width: 1440px;
    margin-top: 50px;
    justify-content: space-around;
    align-items: center;
}
</style>