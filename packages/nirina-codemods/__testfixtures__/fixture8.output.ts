import { ref } from "vue";
const count = ref(0);
export default {
  methods: {
    increment: async function() {
      this.count = await (await fetch('/request')).json();
    },
  }
};