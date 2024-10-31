<script setup>
import { ref } from "vue";

const emit = defineEmits(["submit", "update", "invalid"]);

const start = ref("");
const end = ref("");

function submit() {
  emit("submit");
}

function update() {
  emit("update", {
    start: start.value,
    end: end.value,
  });
}
const keysAllowed = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];
function isHex(event) {
  const keyPressed = event.key;

  if (!keysAllowed.includes(keyPressed)) {
    event.preventDefault();
    emit("invalid");
  }
}
</script>

<template>
  <div class="row">
    <div class="col-md-4">
      <label for="prefix">Address prefix</label>
      <input
        id="prefix"
        class="form-control"
        type="text"
        placeholder="start"
        v-model="start"
        @keypress="isHex($event)"
        @input="update"
      />
    </div>
    <div class="col-md-4">
      <label for="suffix">Address suffix</label>
      <input
        id="suffix"
        class="form-control"
        type="text"
        placeholder="end"
        v-model="end"
        @keypress="isHex($event)"
        @input="update"
      />
    </div>
    <div class="col-md-4 align-self-end">
      <button id="buttonGenerate" class="btn btn-primary w-100" @click="submit">
        GENERATE
      </button>
    </div>
  </div>
</template>
