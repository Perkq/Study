<template>
  <div id="Product" class="secondBlock">
    <textButtonBlock v-bind:objectForText="objectForText"></textButtonBlock>
    <div class="producrDescription">
      <div class="imgProduct"></div>
      <p class="h2">
        Automation &<br />
        Orchestration
      </p>
      <p class="h3">
        Provision accounts, get enterprise-wide visibility, and fully integrate
        the cloud with your tech stack to automate the full cloud lifecycle.
      </p>
      <p class="h4">Learn More</p>
    </div>
  </div>
</template>

<script>
import textButtonBlock from "@/components/TextButtonBlock.vue";
export default {
  data() {
    return {
      objectForText: {
        id: 1,
        title: "The Product",
        description:
          "Kion offers the only single platform approach to cloud enablement, transcending cloud management and cloud governance by offering all three pillars necessary for total cloud control.",
        textButton:"More About the Product",
      },
    };
  },
  components: {
    textButtonBlock: textButtonBlock,
  },
};
</script>
<style>
@import './second.css';
</style>
