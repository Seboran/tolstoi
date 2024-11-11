<script setup>

import { ref } from "vue";
const count = ref(0);

async function increment() {
  count.value = await (await fetch('/request')).json();
}

</script>