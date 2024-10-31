<script setup>
import { ref, computed } from "vue";

import CopyButton from "./CopyButton.vue";

const LENGTH_PRIVATE_KEY = 64;

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

const paddedValue = computed(() =>
  props.value ? props.value.padStart(LENGTH_PRIVATE_KEY, "0") : ""
);

// Switch between clear and hidden private key value
// Uses a boolean to switch between 0 and 1, between "password" and "text"
// See reveal function
const inputTypeValues = ["password", "text"];
const revealTextValues = ["SHOW", "HIDE"];
const inputTypeIndex = ref(0);
const inputType = computed(() => inputTypeValues[inputTypeIndex.value]);
const revealText = computed(() => revealTextValues[inputTypeIndex.value]);

function reveal() {
  // Unary operator + to cast boolean into Number
  // Note : the "!" unary operator implictly casts into a boolean
  inputTypeIndex.value = +!inputTypeIndex.value;
}
</script>

<template>
  <div class="row">
    <div class="col-md-10">
      <label for="privateKeyField">Private key</label>
      <div class="input-group">
        <input
          id="privateKeyField"
          class="form-control"
          :type="inputType"
          readonly
          :value="paddedValue"
          placeholder="private key"
          autocomplete="new-password"
        />
        <CopyButton :value="paddedValue" text="Copy private key"></CopyButton>
      </div>
    </div>

    <div class="col-md-2 align-self-end">
      <button
        class="btn btn-secondary w-100"
        type="button"
        @click.prevent="reveal"
      >
        {{ revealText }}
      </button>
    </div>
  </div>
</template>
