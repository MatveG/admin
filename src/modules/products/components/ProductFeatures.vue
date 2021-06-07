<template>
  <div>
    <div v-for="feature in features" :key="feature.id">
      <div v-if="feature.type === 'group'" class="features-group">
        <label class="label is-5 has-text-centered">{{ feature.title }}</label>
        <product-features :prop-features="feature.sub" />
      </div>

      <b-field v-else :label="feature.title" horizontal
               :type="{ 'is-danger': v[feature.key] && v[feature.key].$error }">

        <div v-if="feature.type === 'number'" class="control has-icons-right">
          <b-input v-model.number="product.features[feature.key]" type="number" step="any" />
          <span class="icon is-right is-bold has-text-black">{{ feature.units }}</span>
        </div>

        <b-input v-if="feature.type === 'string'" v-model="product.features[feature.key]" />

        <b-input v-if="feature.type === 'text'" v-model="product.features[feature.key]" type="textarea" maxlength="15000" />

        <template v-if="feature.type === 'bool'">
          <b-select v-model="product.features[feature.key]" expanded>
            <option :value="null">выберите</option>
            <option :value="1">есть</option>
            <option :value="0">нет</option>
          </b-select>
        </template>

        <b-select v-if="feature.type === 'select'" v-model="product.features[feature.key]" expanded>
          <option :value="null">выберите</option>
          <option v-for="(value, idx) in feature.values" :key="idx">{{ value }}</option>
        </b-select>

        <b-select v-if="feature.type === 'multiple'" v-model="product.features[feature.key]" multiple expanded
                  :init="!product.features[feature.key] ? product.features[feature.key] = [] : true"
                  :native-size="feature.values.length > 5 ? 5 : feature.values.length">
          <option v-for="(value, idx) in feature.values" :key="idx">{{ value }}</option>
        </b-select>
      </b-field>
    </div>
  </div>
</template>

<script>
import ProductFeatures from './ProductFeatures'

export default {
  name: 'ProductFeatures',
  components: {
    ProductFeatures
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    },
    features: {
      type: Array,
      default: () => []
    },
    v: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>
.features-group {
  border-top: 2px solid #eee;
  border-bottom: 2px solid #eee;
  margin: 1rem 0 1rem 0;
  padding: 1rem 0 1rem 0;
}
</style>
