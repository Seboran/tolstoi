// convert vue2 script component into vue 3 setup
export default {
  methods: {
    fetchApi: async function() {
      const request = await fetch('/request/info');
    },
  },
};