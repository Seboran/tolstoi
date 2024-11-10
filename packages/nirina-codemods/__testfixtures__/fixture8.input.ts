export default {
  data: () => ({ count: 0 }),
  methods: {
    increment: async function() {
      this.count = await (await fetch('/request')).json();
    },
  },
};