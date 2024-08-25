<script setup lang="ts">
defineProps<{
  item: string
}>()
</script>

<template>
  <tr>
    <td>{{ item }}</td>
    <td>
      <input
        :id="'password ' + item"
        type="password"
        :name="'password of ' + item"
        value="*************"
      >
    </td>
    <td>
      <slot />
    </td>
  </tr>
</template>
