<script setup lang="ts">
defineProps<{
  item: string
}>()
</script>

<template>
  <tr>
    <td>{{ item }}</td>

    <td>
      <slot />
    </td>
  </tr>
</template>
