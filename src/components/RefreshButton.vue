<template>
  <button
      @click.prevent="$emit('click')"
      :class="{'is-loading':isLoading}"
      class="button is-small"
      type="button">
    <b-icon :icon="icon" custom-size="default"/>
    <span>{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'RefreshButton',
  props: {
    icon: {
      type: String,
      default: 'refresh'
    },
    label: {
      type: String,
      default: 'Обновить'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
