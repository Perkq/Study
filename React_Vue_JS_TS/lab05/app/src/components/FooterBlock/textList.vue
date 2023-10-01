<template>
    <div v-bind:id="id_div" class="list_header">
        <div class="header_list_text">{{ head_text }}</div>
        <ul class="list_container">
            <li v-for="text in text_list" :key="text.id">               
                {{ text.title }}
            </li>
        </ul>
    </div>
</template>

<script>
export default{
    name: "textList",
    props:['text_list', "head_text", "id_div"]

}
</script>

<style>
.list_header {
    width: 429px;
    padding-top: 100px;
}

.header_list_text {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #878D90;
    text-align: left;
}

.list_container li {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #CFD2D3;
    text-align: left;
}

ul {
    margin-left: -140px;
}

/* .conteiner{
    display: flex;
    flex-direction: row;
    width: 1440px;
    margin-top: 50px;
    justify-content: space-around;
    align-items: center;
} */
</style>