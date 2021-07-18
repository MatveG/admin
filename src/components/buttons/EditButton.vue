<template>
  <b-button
      :size="size"
      :to="to"
      :tag="to ? 'router-link' : 'button'"
      @click="$emit('click')"
      outlined
      type="is-primary"
      icon-right="square-edit-outline"
      slot="trigger"/>
</template>

<script>
export default {
  name: 'EditButton',
  props: {
    to: {
      type: [String, Object],
      default: () => null
    },
    size: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
