<template>
  <b-input v-model="model.features[feature.key]" type="textarea" maxlength="15000"/>
</template>

<script>
import useModelBinding from '@/compositions/useModelBinding'

export default {
  name: 'FeatureText',
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
