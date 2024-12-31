<script setup>
import CopyButton from './CopyButton.vue'

defineProps({
  value: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="row">
    <label for="publicKeyField">Ethereum address</label>
    <div class="input-group">
      <input
        id="publicKeyField"
        class="form-control"
        placeholder="public key"
        readonly
        :value="value"
      />
      <CopyButton :value="value" text="Copy public key"></CopyButton>
    </div>
  </div>
</template>
