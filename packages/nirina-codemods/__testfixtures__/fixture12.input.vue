<template>
  <div>
    <h1>{{ name }}</h1>
    <button @click="increment">Click on me!</button>
    You clicked on me {{ count }} times.
  </div>
</template>

<script>
export default {
  data: () => ({ count: 0}),
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    increment: function() {
      this.count += 1
    }
  }
}
</script>