<template>
  <div class="control has-icons-right">
    <b-input v-model.number="model.features[feature.key]" type="number" step="any"/>
    <span class="icon is-right is-bold has-text-black">{{ feature.units }}</span>
  </div>
</template>

<script>
import useModelBinding from '@/compositions/useModelBinding'

export default {
  name: 'FeatureNumber',
  props: {
    value: {
      type: Object,
      required: true
    },
    feature: {
      type: Object,
      required: true
    }
  },
  setup (props, context) {
    const { model } = useModelBinding(props, context);
    return { model };
  }
}
</script>

<style scoped>

</style>
