<script setup>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import SourceCode from "./components/SourceCode.vue";
</script>

<template>
  <div id="grid">
    <header>
      <img
        alt="Ethereum logo"
        class="logo"
        src="./assets/logo.svg"
        width="125"
        height="125"
      />

      <div class="wrapper">
        <Header msg="Ethereum Wallet Generator" />
      </div>
    </header>

    <main>
      <Main />
    </main>
  </div>

  <footer class="text-end text-muted"><SourceCode /></footer>
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: rgb(0, 76, 189);
  transition: 0.4s;
}

footer {
  margin-top: 50px;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(202, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 1rem 0 0;
  }
}
</style>
