<template>
  <card-component title="Цена" icon="currency-usd" class="mt-5">
    <b-field :label="product.is_sale ? 'Старая цена' : 'Цена'" label-position="on-border">
      <b-input
          v-if="product.is_sale"
          v-model.number="product.price_old"
          type="number" step="any" placeholder="0.0" expanded/>
      <b-input
          v-else
          v-model.number="product.price"
          type="number" step="any" placeholder="0.0" expanded/>

      <div class="control">
        <div class="button is-static">{{ currencySign }}</div>
      </div>
    </b-field>

    <b-field class="has-text-centered">
      <b-switch v-model="product.is_sale" @change.native="toggleDiscount">
        Скидка
      </b-switch>
    </b-field>

    <div v-if="product.is_sale">
      <div class="columns">
        <div class="column">
          <b-field label="Скидка" label-position="on-border">
            <b-input
                v-model.number="percent"
                @change.native="calcSalePrice"
                placeholder="0"/>
            <div class="control">
              <button class="button is-primary">%</button>
            </div>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Цена со скидкой" label-position="on-border">
            <b-input
                v-model.number="product.price"
                :disabled="!product.is_sale"
                type="number" step="any" placeholder="0.0" expanded/>
            <div class="control">
              <div class="button is-static">{{ currencySign }}</div>
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
    product: {
      type: Object,
      required: true
    },
    currencySign: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      percent: null,
      tab: 0
    }
  },
  methods: {
    toggleDiscount () {
      if (this.product.is_sale) {
        this.product.price_old = this.product.price;
      } else {
        this.product.price = this.product.price_old;
      }
      this.product.sale_text = null;
    },

    calcSalePrice () {
      const discount = Math.round(this.product.price_old * this.percent / 100);
      this.product.price = this.product.price_old - discount;
      this.percent = null;
    }
  }
}
</script>

<style scoped>

</style>
