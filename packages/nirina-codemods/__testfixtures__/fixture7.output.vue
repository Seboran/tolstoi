<script setup>

import { ref } from "vue";
const count = ref(0);
export default {
  methods: {
    increment: function() {
      this.count += 1;
    },
  }
};

</script>