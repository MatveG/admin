<template>
  <section class="section hero is-fullheight is-error-section">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Page',
  mounted () {
    this.$store.commit('fullPage', true);
    this.$store.commit('asideRightToggle', false);
  },
  beforeDestroy () {
    this.$store.commit('fullPage', false);
  }
};
</script>
