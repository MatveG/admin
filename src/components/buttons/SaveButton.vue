<template>
  <b-button
      :loading="loading"
      :disabled="disabled"
      @click="$emit('click')"
      type="is-primary"
      icon-right="content-save"/>
</template>

<script>
export default {
  name: 'SaveButton',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
