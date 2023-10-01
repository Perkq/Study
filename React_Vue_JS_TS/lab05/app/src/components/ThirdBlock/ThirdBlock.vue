<template>
  <div id="Resources" class="thirdBlock">
    <h1>Our Results</h1>
    <ResultItem v-bind:results="results" />
  </div>
</template>

<script>
import ResultItem from "@/components/ThirdBlock/ResultItem.vue";

export default {
  data() {
    return {
      results: [
        {
          id: 1,
          title: "10x",
          description: "Faster cloud account setup and provisioning",
        },
        {
          id: 2,
          title: "30%",
          description: "Savings, on average, in cloud bills",
        },
        {
          id: 3,
          title: "4,000+",
          description:
            "One-click resources to automate compliance and security",
        },
      ],
    };
  },
  components: {
    ResultItem: ResultItem,
  },
};
</script>

<style>
@import './third.css';

</style>
