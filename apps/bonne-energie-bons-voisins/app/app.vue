<template>
  <NuxtLayout>
    <template #header>
      <span class="text-6xl">⚡️</span>
      <h1
        class="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl dark:text-white"
      >
        Simulateur de distribution d'énergie
      </h1>
    </template>
    <NuxtPage />
  </NuxtLayout>
  <Head>
    <Title>Bonne énergie bons voisins</Title>
  </Head>
  <Html lang="fr" />
</template>

<style lang="css">
:root {
  --main-bg-color: #f9f9f9; /* Define your CSS variable here */
  --border-radius: 5px;
}

* {
  font-family: 'Arial', sans-serif;
}
</style>
