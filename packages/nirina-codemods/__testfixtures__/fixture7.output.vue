<script setup>

import { ref } from "vue";
const count = ref(0);

function increment() {
  count.value += 1;
}

</script>