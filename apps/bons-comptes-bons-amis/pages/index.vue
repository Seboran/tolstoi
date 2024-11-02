<script setup lang="ts">
import BalancesFormV2 from '~/components/v2/BalancesFormV2.vue'
</script>

<template>
  <RoutingSwitchRoute :selected-tab="0" @click="navigateTo('/detaille')">
    <template #item>
      <slot />
    </template>
  </RoutingSwitchRoute>
  <BalancesFormV2 />
</template>
