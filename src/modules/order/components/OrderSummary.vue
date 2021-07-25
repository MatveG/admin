<template>
  <card-component title="Итого" icon="sigma">
    <table class="table is-bordered is-striped is-narrow is-fullwidth">
      <tbody>
      <tr>
        <td>Сумма</td>
        <td>{{order.total}}</td>
      </tr>
      <tr>
        <td>Скидка</td>
        <td>
          <b-field>
            <b-input v-model="order.discount" size="is-small"/>
          </b-field>
        </td>
      </tr>
      <tr>
        <td>Доставка</td>
        <td>
          <b-field>
            <b-input v-model="order.shipping" size="is-small"/>
          </b-field>
        </td>
      </tr>
      <tr>
        <td>Итого</td>
        <td>{{order.total}}</td>
      </tr>
      </tbody>
    </table>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent';

export default {
  name: 'OrderSummary',
  components: {
    CardComponent
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>

</style>
