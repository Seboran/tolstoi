<template>
  <div class="flex flex-wrap flex-col gap-4 max-w-screen-xl min-w-80 justify-center">
    <section class="min-w-80 flex flex-col justify-center gap-4">
      <slot name="premier-groupe" />
    </section>
    <section class="min-w-80">
      <slot name="deuxieme-groupe" />
    </section>
    <section class="flex flex-col gap-2 min-w-80">
      <slot name="troisie-groupe" />
    </section>
  </div>
</template>
