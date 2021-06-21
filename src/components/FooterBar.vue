<template>
  <footer v-show="isVisible" class="footer">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          &nbsp;
        </div>
        <div class="level-right">
          <div class="level-item">&copy;</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar',
  props: {
    isVisible: Boolean
  }
}
</script>
