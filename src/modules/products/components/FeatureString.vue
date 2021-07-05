<template>
  <b-input v-model="model.features[feature.key]"/>
</template>

<script>
import useModelBinding from '@/hooks/useModelBinding'

export default {
  name: 'FeatureString',
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
