<template>
  <div>Count is {{ count }}</div>
  <button @click="increment">click on me</button>
</template>

<script lang="ts">
export default {
  data: () => ({ count: 0 }),
  methods: {
    increment: async function() {
      this.count = await (await fetch('/request')).json();
    },
  },
};
</script>