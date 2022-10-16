<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ msg: string; show: boolean }>();
const emit = defineEmits<{ (e: "update:show", value: boolean): void }>();

const text = computed(() => (_show.value ? props.msg : "Révéler"));
const _show = computed({
  get() {
    return props.show;
  },
  set(val) {
    emit("update:show", val);
  },
});

function showText() {
  _show.value = !_show.value;
}
</script>

<template>
  <button class="btn btn-primary w-100" @click="showText">{{ text }}</button>
</template>
