<template>
  <div>
    <button @click="increment">Click on me!</button>
    You clicked on me {{ count }} times.
  </div>
</template>

<script setup>

import { ref } from "vue";
const count = ref(0);

function increment() {
  count.value += 1
}

</script>