<template>
  <div v-if="isVisible" @click="$emit('click')" class="ui-overlay"/>
</template>

<script>
export default {
  name: 'Overlay',
  props: {
    isVisible: Boolean
  }
};
</script>
