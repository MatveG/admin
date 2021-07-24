<template>
  <div class="level">
    <div class="level-left">
      <slot name="left"/>
    </div>
    <div class="lever-right">
      <slot name="right"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonsToolbar'
};
</script>

<style scoped>

</style>
