<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

const props = defineProps<{ msg: string }>();

const show = ref(false);
const text = computed(() => (show.value ? props.msg : "Révéler"));

function showText() {
  show.value = !show.value;
}
</script>

<template>
  <button @click="showText">{{ text }}</button>
</template>
