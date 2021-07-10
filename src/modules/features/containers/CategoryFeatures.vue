<template>
  <features-list
      :features="features"
      :category-id="categoryId"
      :parent-id="0"/>
</template>

<script>

import FeaturesList from '@/modules/features/containers/FeaturesList'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CategoryFeatures',
  components: { FeaturesList },
  props: {
    categoryId: {
      type: Number,
      required: true
    }
  },
  computed: mapGetters({
    features: 'getFeatures'
  }),
  mounted () {
    this.fetchFeatures(this.categoryId);
  },
  methods: mapActions([
    'fetchFeatures'
  ])
}
</script>

<style scoped>

</style>
