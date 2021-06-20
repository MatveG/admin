<template>
  <div class="columns">
    <div class="column is-2">
      <h5 class="subtitle is-6">Заказ</h5>
      <p>
        <span class="has-text-grey">#:</span>
        &nbsp;{{row.id}}
      </p>
      <p>
        <span class="has-text-grey">Дата:</span>
        &nbsp;{{row.created_at}}
      </p>
      <p>
        <span class="has-text-grey">Статус:</span>
        &nbsp;{{status}}
      </p>
    </div>
    <div class="column is-3">
      <h5 class="subtitle is-6">Оплата</h5>
      <p>
        <span class="has-text-grey">Оплата:</span>
        &nbsp;{{payment}}
      </p>
      <p>
        <span class="has-text-grey">Сумма:</span>
        &nbsp;{{row.total}}
      </p>
      <p>
        <span class="has-text-grey">
          Скидка:
        </span>
        &nbsp;{{row.discount}} %
      </p>
    </div>
    <div class="column is-3">
      <h5 class="subtitle is-6">Доставка</h5>
      <p>
        <span class="has-text-grey">Доставка:</span>
        &nbsp;{{delivery}}
      </p>
      <p>
        <span class="has-text-grey">Стоимость:</span>
        &nbsp;{{row.shipping}}
      </p>
      <div>
        <div v-for="(address, idx) in addresses" :key="idx" class="is-italic">
          <span class="has-text-grey">{{address[0]}}:</span>
          &nbsp;{{address[1]}}
        </div>
      </div>
    </div>
    <div class="column">
      <h5 class="subtitle is-6">Клиент</h5>
      <p>
        <span class="has-text-grey">Имя:</span>
        &nbsp;{{row.client}}
      </p>
      <p>
        <span class="has-text-grey">Телефон:</span>
        &nbsp;{{row.phone}}
      </p>
      <p>
        <span class="has-text-grey">E-mail:</span>
        &nbsp;{{row.email}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrdersDetail',
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    status: String,
    payment: String,
    delivery: String,
    addresses: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
h5 {
  padding-bottom: 0.25rem;
  border-bottom: solid #ddd 1px;
}
</style>
