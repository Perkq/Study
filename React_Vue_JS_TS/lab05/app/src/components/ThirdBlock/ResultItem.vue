<template>
  <div class="conteinerFor">
    <div v-for="result in results" :key="result.id">
      <h2>{{ result.title }}</h2>
      <h3>{{ result.description }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultItem",
  props: ["results"],
};
</script>

<style>
@import './result.css';
</style>
