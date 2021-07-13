<template>
  <div>
    <b-field :type="{ 'is-danger': v.type.$error }">
      <b-select v-model="model.type" @change.native="$emit('change')" expanded>
        <option v-for="(title, key) in dataTypes" :key="key" :value="key">
          {{ title }}
        </option>
      </b-select>
    </b-field>
    <template v-if="model.type === 'number'">
      <b-field label="Ед. измерения" label-position="on-border">
        <b-input v-model="model.units" placeholder="кг" />
      </b-field>
    </template>
    <template v-if="model.type === 'select' || model.type === 'multiple'">
      <b-field :type="{ 'is-danger': v.values.$error }"
               label="Список значений" label-position="on-border">
        <b-taginput v-model="model.values" placeholder="Добавить"  />
      </b-field>
    </template>
  </div>
</template>

<script>
import useModelBinding from '@/compositions/useModelBinding'

export default {
  name: 'EditDataType',
  props: {
    value: {
      type: Object,
      required: true
    },
    dataTypes: {
      type: Object,
      required: true
    },
    v: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, context) {
    return {
      ...useModelBinding(props, context)
    };
  }
}
</script>

<style scoped>

</style>
