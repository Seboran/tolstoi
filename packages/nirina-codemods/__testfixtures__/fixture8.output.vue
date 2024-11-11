<script setup>

import { ref } from "vue";
const count = ref(0);

async function increment() {
  this.count = await (await fetch('/request')).json();
}

</script>