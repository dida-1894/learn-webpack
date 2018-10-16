<template lang="html">
  <h1>{{title}}</h1>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'This is a title'
    }
  }
}
</script>

<style lang="stylus">
  h1{
    text-align: center;
  }
</style>
