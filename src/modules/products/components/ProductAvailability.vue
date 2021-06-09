<template>
  <card-component
      v-if="product.variants && !product.variants.length"
      class="card-top-margin"
      title="Наличие"
      icon="warehouse">
    <b-field label="Артикул" label-position="on-border">
      <b-input v-model="product.code"/>
    </b-field>

    <b-field label="Штрих-код" label-position="on-border">
      <b-input v-model="product.barcode"/>
    </b-field>

    <b-field class="has-text-centered m-5">
      <b-switch v-model="product.is_stock">
        В наличии
      </b-switch>
    </b-field>

    <div class="columns">
      <b-field label="Запас на складе" label-position="on-border" class="column">
        <b-input v-model.number="product.stock" :disabled="!product.is_stock" type="number" placeholder="0"/>
        <div class="control"><div class="button is-static">шт</div></div>
      </b-field>
      <b-field label="Вес" label-position="on-border" class="column">
        <b-input v-model.number="product.weight" type="number" step="any" placeholder="0.0"/>
        <div class="control"><div class="button is-static">кг</div></div>
      </b-field>
    </div>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'ProductAvailability',
  components: {
    CardComponent
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
