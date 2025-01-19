<template>
  <div class="flex min-w-80 max-w-screen-xl flex-col flex-wrap justify-center gap-4">
    <section class="flex min-w-80 flex-col justify-center gap-4">
      <slot name="premier-groupe" />
    </section>
    <section class="flex w-full min-w-80 flex-col justify-center gap-4">
      <slot name="deuxieme-groupe" />
    </section>
    <section class="flex min-w-80 flex-col gap-2">
      <slot name="troisieme-groupe" />
    </section>
  </div>
</template>
