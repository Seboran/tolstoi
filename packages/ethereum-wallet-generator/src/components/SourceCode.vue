<script setup>
const sourceCode = import.meta.env.VITE_GITHUB_LINK;
</script>

<template>
  <div id="sourceCode" class="col">
    <a :href="sourceCode">Source code</a>
  </div>
</template>
