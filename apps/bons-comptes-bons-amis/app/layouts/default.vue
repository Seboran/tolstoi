<template>
  <main class="m-auto flex max-w-3xl flex-col p-8">
    <header class="m-auto mb-2 text-center">
      <span class="text-6xl">🤑</span>
      <h1
        class="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl dark:text-white"
      >
        Bons comptes bons amis
      </h1>
      <p class="text-start">
        Vous avez besoin d'aide pour répartir vos dépenses en groupe suite à des vacances, la vie en
        coloc ou les restaurants ? Choisissez un des modes, remplissez la liste des personnes du
        groupe et ajoutez ce que chacun a dépensé ! (ou pas... 🙈)
      </p>
    </header>
    <slot />
    <footer class="relative bottom-0 mt-2 justify-self-stretch text-right">
      <ULink
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        to="https://github.com/Seboran/monorepo/tree/main/apps/bons-comptes-bons-amis"
      >
        Code github
      </ULink>
    </footer>
  </main>
</template>
