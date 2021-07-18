<template>
  <b-button
      :size="size"
      @click="$emit('click')"
      outlined
      type="is-primary"
      icon-right="arrow-left-circle"/>
</template>

<script>
export default {
  name: 'BackButton',
  props: {
    size: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
