<template>
  <card-component title="Цена" icon="currency-usd" class="card-top-margin">
    <b-field label="Цена" label-position="on-border">
      <b-input v-model.number="product.price" type="number" step="any" placeholder="0.0" expanded/>
      <div class="control">
        <div class="button is-static">{{ currencySign }}</div>
      </div>
    </b-field>

    <b-field class="has-text-centered">
      <b-switch v-model="product.is_sale" @change.native="$emit('toggleDiscount')">
        Скидка
      </b-switch>
    </b-field>

    <div v-if="product.is_sale">
      <div class="columns">
        <div class="column">
          <b-field label="Скидка" label-position="on-border">
            <b-input type="number" step="any" placeholder="0"
                     v-model="discount.percent" @change.native="$emit('updateSalePrice')"/>
            <div class="control">
              <button class="button is-primary">%</button>
            </div>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Цена со скидкой" label-position="on-border">
            <b-input type="number" step="any" placeholder="0.0" expanded
                     v-model.number="product.price_sale" :disabled="!product.is_sale"/>
            <div class="control">
              <div class="button is-static">{{ setting('currency', 'sign') }}</div>
            </div>
          </b-field>
        </div>
      </div>
      <b-field label="Детали акции" label-position="on-border">
        <b-input v-model="product.sale_text" type="textarea" rows="1" />
      </b-field>
    </div>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'ProductPrice',
  components: {
    CardComponent
  },
  props: {
    product: Object,
    discount: Object,
    currencySign: String
  },
  data () {
    return {
      tab: 0
    }
  }
}
</script>

<style scoped>

</style>
