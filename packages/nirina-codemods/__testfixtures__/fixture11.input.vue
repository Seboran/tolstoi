<template>
  <div>
    <button @click="increment">Click on me!</button>
    You clicked on me {{ count }} times.
  </div>
</template>

<script>
export default {
  data: () => ({ count: 0}),
  methods: {
    increment: function() {
      this.count += 1
    }
  }
}
</script>