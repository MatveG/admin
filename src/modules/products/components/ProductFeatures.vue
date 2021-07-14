<template>
  <div>
    <div v-for="feature in features" :key="feature.id">
      <div v-if="feature.type === 'group'" class="my-3 py-3 features-group">
        <label class="label is-5 has-text-centered">{{ feature.title }}</label>
        <product-features :prop-features="feature.children" />
        <product-features
            v-model="model"
            :features="feature.children"
            :v="v"/>
        </div>
      <b-field
          v-else
          class="mb-4"
          label-position="on-border"
          :label="feature.title"
          :type="{ 'is-danger': v[feature.key] && v[feature.key].$error }">
        <component
            :is="`feature-${feature.type}`"
            v-model="model"
            :feature="feature"/>
      </b-field>
    </div>
  </div>
</template>

<script>
import useModelBinding from '@/compositions/useModelBinding'
import FeatureBoolean from './FeatureBoolean'
import FeatureMultiple from './FeatureMultiple'
import FeatureNumber from './FeatureNumber'
import FeatureSelect from './FeatureSelect'
import FeatureString from './FeatureString'
import FeatureText from './FeatureText'
import ProductFeatures from './ProductFeatures'

export default {
  name: 'ProductFeatures',
  components: {
    FeatureBoolean,
    FeatureMultiple,
    FeatureNumber,
    FeatureSelect,
    FeatureString,
    FeatureText,
    ProductFeatures
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    features: {
      type: Array,
      default: () => []
    },
    v: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, context) {
    const { model } = useModelBinding(props, context);
    return { model };
  }
}
</script>

<style scoped>
.features-group {
  border-top: 2px solid #eee;
  border-bottom: 2px solid #eee;
}
</style>
