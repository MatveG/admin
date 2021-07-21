<template>
  <card-component title="Оплата/Доставка" icon="credit-card-marker-outline">
    <b-field :type="{ 'is-danger': $v.order.payment.$error }"
             label="Оплата" label-position="on-border">
      <b-select v-model="order.payment" expanded>
        <option
            v-for="(value, idx) in Object.entries(settings.payment)"
            :key="idx"
            :value="value[0]">
          {{value[1]}}
        </option>
      </b-select>
    </b-field>

    <b-field :type="{ 'is-danger': $v.order.delivery.$error }" label="Доставка" label-position="on-border">
      <b-select v-model="order.delivery" expanded>
        <option
            v-for="(value, idx) in Object.entries(settings.delivery)"
            :key="idx"
            :value="value[0]">
          {{value[1]}}
        </option>
      </b-select>
    </b-field>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'OrderPayment',
  components: {
    CardComponent
  },
  props: {
    order: {
      type: Object,
      required: true
    },
    $v: {
      type: Object,
      required: true
    },
    settings: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
