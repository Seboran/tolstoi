<script setup lang="ts">
import TableCell from './components/ui/table/TableCell.vue'
import TableRow from './components/ui/table/TableRow.vue'

defineProps<{
  item: string
}>()
defineEmits<{
  copy: []
}>()
</script>

<template>
  <TableRow tabindex="0" @keydown.enter="$emit('copy')" @click="$emit('copy')">
    <TableCell class="w-full">
      {{ item }}
    </TableCell>
    <!-- <TableCell></TableCell> -->
  </TableRow>
</template>
