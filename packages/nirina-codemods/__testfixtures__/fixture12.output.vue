<template>
  <div>
    <h1>{{ name }}</h1>
    <button @click="increment">Click on me!</button>
    You clicked on me {{ count }} times.
  </div>
</template>

<script setup>

import { ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

const count = ref(0);

function increment() {
  count.value += 1
}

</script>