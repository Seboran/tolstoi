<template>
  <main class="flex flex-col p-8">
    <header class="m-auto text-center mb-2">
      <h1
        class="text-3xl leading-9 font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
      >
        Bons comptes bons amis
      </h1>
    </header>
    <slot />
    <footer class="relative justify-self-stretch text-right bottom-0 mt-2">
      <ULink
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        to="https://github.com/Seboran/bons-comptes-bons-amis"
      >
        Code github
      </ULink>
    </footer>
  </main>
</template>
