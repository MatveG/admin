<template>
  <card-component
      v-if="model.variants && !model.variants.length"
      title="Наличие"
      icon="warehouse">
    <div class="columns">
      <div class="column is-half">
        <b-field label="Артикул" label-position="on-border">
          <b-input v-model="model.code"/>
        </b-field>
      </div>
      <div class="column is-half">
        <b-field label="Штрих-код" label-position="on-border">
          <b-input v-model="model.barcode"/>
        </b-field>
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column is-half">
        <b-field label="Вес" label-position="on-border">
          <b-input v-model.number="model.weight" type="number" step="any" placeholder="0.0"/>
          <div class="control"><div class="button is-static">кг</div></div>
        </b-field>
      </div>
    </div>

    <b-field class="has-text-centered">
      <b-switch v-model="model.is_stock">
        В наличии
      </b-switch>
    </b-field>

    <div class="columns is-multiline mt-3">
      <template v-for="(stock, idx) in stocks">
        <div :key="idx" class="column is-half">
          <b-field :label="stock" label-position="on-border">
            <b-input
                v-model.number="model.stocks[idx]"
                :disabled="!model.is_stock"
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
import useModelBinding from '@/hooks/useModelBinding'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'ProductAvailability',
  components: {
    CardComponent
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    stocks: {
      type: Object,
      required: true
    }
  },
  watch: {
    'model.is_stock': function () {
      if (!this.model.is_stock) {
        Object.keys(this.model.stocks).forEach((el) => {
          this.model.stocks[el] = 0
        })
      }
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
