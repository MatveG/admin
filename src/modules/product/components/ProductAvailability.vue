<template>
  <card-component title="Наличие" icon="warehouse">
    <div class="columns">
      <div class="column is-half">
        <b-field label="Артикул" label-position="on-border">
          <b-input v-model="product.code"/>
        </b-field>
      </div>
      <div class="column is-half">
        <b-field label="Штрих-код" label-position="on-border">
          <b-input v-model="product.barcode"/>
        </b-field>
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column is-half">
        <b-field label="Вес" label-position="on-border">
          <b-input v-model.number="product.weight" type="number" step="any" placeholder="0.0"/>
          <div class="control"><div class="button is-static">кг</div></div>
        </b-field>
      </div>
    </div>

    <b-field class="has-text-centered">
      <b-switch v-model="product.is_stock" @input="changeIsStock">
        В наличии
      </b-switch>
    </b-field>

    <div v-if="product.is_stock" class="columns is-multiline mt-3">
      <template v-for="(stock, idx) in stocks">
        <div :key="idx" class="column is-half">
          <b-field :label="stock" label-position="on-border">
            <b-input
                v-model.number="product.stocks[idx]"
                type="number"
                placeholder="0"/>
            <div class="control">
              <div class="button is-static">шт</div>
            </div>
          </b-field>
        </div>
      </template>
    </div>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent';

export default {
  name: 'ProductAvailability',
  components: {
    CardComponent
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    stocks: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeIsStock (value) {
      if (!value) {
        Object.keys(this.product.stocks).forEach((el) => {
          this.product.stocks[el] = 0;
        });
      }
    }
  }
};
</script>

<style scoped>

</style>
