<template>
    <div class="container">
    <textButtonBlock v-bind:objectForText="objectForText"></textButtonBlock>
    </div>
</template>

<script>

import TextButtonBlock from "@/components/TextButtonBlock.vue";

export default {
    name: "SixxthBlock",
    data() {
    return {
      objectForText: {
        id: 1,
        title: "Start your cloud enablement journey.",
        description:
          "Request a demo today,",
        textButton:"Request Demo",
      },
    };
  },
    components: {
            TextButtonBlock
    }
}
</script>

<style>

@import './sixth.css';

</style>