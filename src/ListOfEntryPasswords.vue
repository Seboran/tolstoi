<script setup lang="ts">
import { ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import PasswordEntryLine from './PasswordEntryLine.vue'
import TableHeader from './components/ui/table/TableHeader.vue'
import TableBody from './components/ui/table/TableBody.vue'
defineProps<{
  filteredPasswordList: string[]
}>()

const emit = defineEmits<{
  copy: [name: string]
}>()

function copyPassword(name: string) {
  emit('copy', name)
}

const items = ref<ComponentPublicInstance[] | null>([])
defineExpose({ items })
</script>

<template>
  <Table class="w-full">
    <TableHeader class="w-full"></TableHeader>
    <TableBody class="w-full">
      <PasswordEntryLine
        v-for="passwordItem in filteredPasswordList"
        :key="passwordItem"
        :item="passwordItem"
        @copy="copyPassword(passwordItem)"
        ref="items"
      >
        <!-- <DsButton
          type="button"
          :aria-label="'Copy password of ' + passwordItem"
          @click="copyPassword(passwordItem)"
        >
          Copy to clipboard
        </DsButton>
        <DsButton type="button">Auto type</DsButton> -->
      </PasswordEntryLine>
    </TableBody>
  </Table>
</template>
