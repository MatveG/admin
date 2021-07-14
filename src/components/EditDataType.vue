<template>
  <div>
    <b-field :type="{ 'is-danger': v.type.$error }">
      <b-select v-model="item.type" @change.native="$emit('change')" expanded>
        <option v-for="(title, key) in dataTypes" :key="key" :value="key">
          {{ title }}
        </option>
      </b-select>
    </b-field>
    <template v-if="item.type === 'number'">
      <b-field label="Ед. измерения" label-position="on-border">
        <b-input v-model="item.units" placeholder="кг" />
      </b-field>
    </template>
    <template v-if="item.type === 'select' || item.type === 'multiple'">
      <b-field :type="{ 'is-danger': v.values.$error }"
               label="Список значений" label-position="on-border">
        <b-taginput v-model="item.values" placeholder="Добавить"  />
      </b-field>
    </template>
  </div>
</template>

<script>
export default {
  name: 'EditDataType',
  props: {
    item: {
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
  }
}
</script>

<style scoped>

</style>
