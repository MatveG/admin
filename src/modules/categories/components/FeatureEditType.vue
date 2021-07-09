<template>
  <div>
<!--    :type="{ 'is-danger': $v.model.type.$error }"-->
    <b-field>
      <b-select v-model="model.type" @change.native="reset" expanded>
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
<!--      :type="{ 'is-danger': $v.model.values.$error }-->
      <b-field label="Список значений" label-position="on-border">
        <b-taginput v-model="model.values" placeholder="Добавить"  />
      </b-field>
    </template>
  </div>
</template>

<script>
import useModelBinding from '@/hooks/useModelBinding'

export default {
  name: 'FeatureEditType',
  props: {
    value: {
      type: Object,
      required: true
    },
    dataTypes: {
      type: Object,
      required: true
    }
  },
  setup (props, context) {
    return { ...useModelBinding(props, context) };
  },
  methods: {
    reset () {
      this.is_required = false;
      this.is_filter = false;
      this.units = null;
      this.values = [];
    }
  }
}
</script>

<style scoped>

</style>
