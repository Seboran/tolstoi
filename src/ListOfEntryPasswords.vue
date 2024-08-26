<script setup lang="ts">
import PasswordEntryLine from './PasswordEntryLine.vue'
defineProps<{
  filteredPasswordList: string[]
}>()

const emit = defineEmits<{
  copy: [name: string]
}>()

function copyPassword(name: string) {
  emit('copy', name)
}
</script>

<template>
  <table>
    <thead>
      <th>Nom</th>
      <th>Actions</th>
    </thead>
    <tbody>
      <PasswordEntryLine
        v-for="passwordItem in filteredPasswordList"
        :key="passwordItem"
        :item="passwordItem"
      >
        <button
          type="button"
          :aria-label="'Copy password of ' + passwordItem"
          @click="copyPassword(passwordItem)"
        >
          Copy to clipboard
        </button>
        <button type="button">Auto type</button>
      </PasswordEntryLine>
    </tbody>
  </table>
</template>
