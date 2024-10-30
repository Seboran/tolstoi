<script setup>
import { onMounted, ref, nextTick } from "vue";

import GenerateButton from "./generator/GenerateButton.vue";
import PrivateKeyField from "./generator/PrivateKeyField.vue";
import PublicKeyField from "./generator/PublicKeyField.vue";

const worker = new Worker(new URL("./workers/worker.js", import.meta.url), {
  type: "module",
});

const publicKey = ref("");
const privateKey = ref("");

const start = ref("");
const end = ref("");

const loading = ref(false);

function update({ start: st, end: en }) {
  start.value = st;
  end.value = en;
}

function generateKeys() {
  loading.value = true;
  worker.postMessage({ start: start.value, end: end.value });
}

function invalid() {
  console.error("Invalid ethereum address");
}

onMounted(async () => {
  await nextTick();
  worker.onmessage = ({ data }) => {
    publicKey.value = data.publicKey;
    privateKey.value = data.privateKey;
    loading.value = false;
  };
  worker.onmessageerror = (e) => {
    loading.value = false;
    console.error(e);
  };
});
</script>

<template>
  <form class="col" @submit.prevent="generateKeys">
    <div>
      <GenerateButton @update="update" @invalid="invalid" />
    </div>
    <div v-show="loading">Loading...</div>
    <div>
      <PrivateKeyField :value="privateKey" />
    </div>
    <div>
      <PublicKeyField :value="publicKey" />
    </div>
  </form>
</template>
