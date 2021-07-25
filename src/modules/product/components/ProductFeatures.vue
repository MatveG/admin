<template>
  <div class="columns is-multiline">
    <template v-for="feature in features">
      <div
          v-if="feature.type === 'group'"
          :key="feature.id"
          class="column is-full">
        <h5 class="subtitle is-5 has-text-centered">
          {{ feature.title }}
        </h5>
        <product-features
            :product="product"
            :features="feature.children"
            :$v="$v"/>
        <hr class="m-0">
      </div>
      <div v-else :key="feature.id" class="column is-half">
        <b-field
            :label="feature.title"
            :type="{ 'is-danger': $v.product.features[feature.key]
            && $v.product.features[feature.key].$error }"
            label-position="on-border">
          <component
              :is="`feature-${feature.type}`"
              :product="product"
              :feature="feature"/>
        </b-field>
      </div>
    </template>
  </div>
</template>

<script>
import FeatureBoolean from './FeatureBoolean';
import FeatureMultiple from './FeatureMultiple';
import FeatureNumber from './FeatureNumber';
import FeatureSelect from './FeatureSelect';
import FeatureString from './FeatureString';
import FeatureText from './FeatureText';

export default {
  name: 'ProductFeatures',
  components: {
    FeatureBoolean,
    FeatureMultiple,
    FeatureNumber,
    FeatureSelect,
    FeatureString,
    FeatureText
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    features: {
      type: Array,
      default: () => []
    },
    $v: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style scoped>

</style>
