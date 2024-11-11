<script setup>

import { ref } from "vue";
const count = ref(0);

function increment() {
  this.count += 1;
}

</script>