<template>
  <StyledHeader>
    <b>SUDOKU</b>
  </StyledHeader>
  <div class="bg-ghost_white flex min-h-screen justify-center pt-10">
    <Head>
      <Title>Sudoku</Title>
    </Head>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { StyledHeader } from 'lib-style'
</script>
