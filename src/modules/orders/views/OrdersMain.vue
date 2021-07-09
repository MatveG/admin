<template>
  <section class="section is-main-section">
    <card-component class="has-table has-mobile-sort-spaced" title="Заказы" icon="basket-outline">
<!--      <orders-toolbar :statuses="statuses"/>-->

      <b-table ref="table"
               :data="orders"
               :per-page="perPage"
               :loading="loading"
               detailed paginated hoverable
               class="valign-center"
               detail-key="id"
               default-sort="id"
               default-sort-direction="desc">
        <b-table-column
            v-slot="props"
            centered sortable
            cell-class="is-vcentered"
            label="ID"
            field="id"
            width="10%">
          {{props.row.id}}
        </b-table-column>

        <b-table-column
            v-slot="props"
            sortable centered
            cell-class="is-vcentered"
            label="Оплата"
            field="payment"
            width="15%">
          {{paymentValue(props.row.payment)}}
        </b-table-column>

        <b-table-column
            v-slot="props"
            sortable centered
            cell-class="is-vcentered"
            label="Доставка"
            field="delivery"
            width="15%">
          {{deliveryValue(props.row.delivery)}}
        </b-table-column>

        <b-table-column width="5%">&nbsp;</b-table-column>

        <b-table-column
            v-slot="props"
            searchable
            cell-class="is-vcentered"
            label="Клиент"
            field="phone"
            width="25%">
          <p>{{props.row.client}}</p>
          {{props.row.phone}}
        </b-table-column>

        <b-table-column
            v-slot="props"
            sortable centered
            cell-class="is-vcentered"
            label="Статус"
            field="status"
            width="15%">
          <b-field :type="statusClass(props.row.status)">
            <b-select v-model="props.row.status" @change.native="updateOrder(props.row)">
              <option v-for="(status, idx) in statuses" :key="idx" :value="status[0]">
                {{status[1].title}}
              </option>
            </b-select>
          </b-field>
        </b-table-column>

        <b-table-column
            v-slot="props"
            centered
            cell-class="is-centered is-vcentered buttons is-flex-wrap-nowrap"
            custom-key="actions"
            label="*"
            width="15%">
            <b-button
                :to="{ name: 'orders.edit', params: { propId: props.row.id } }"
                tag="router-link"
                slot="trigger"
                type="is-primary"
                icon-right="square-edit-outline"/>
            <b-button
                @click="confirmDelete(() => deleteOrder(props.row.id))"
                slot="trigger"
                type="is-danger"
                icon-right="delete"/>
        </b-table-column>

        <template slot="detail" slot-scope="props">
          <orders-detail
              :row="props.row"
              :status="statusValue(props.row.status)"
              :payment="paymentValue(props.row.payment)"
              :delivery="deliveryValue(props.row.delivery)"
              :addresses="addressValue(props.row.address)"/>
          <orders-products :products="props.row.products"/>
        </template>
      </b-table>
    </card-component>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CardComponent from '@/components/CardComponent'
import OrdersDetail from '../components/OrdersDetail'
import OrdersProducts from '../components/OrdersProducts'

const status = {
  1: { title: 'Новый', class: 'is-danger' },
  2: { title: 'В обработке', class: 'is-primary' },
  3: { title: 'На доставку', class: 'has-background-warning-light' },
  4: { title: 'Выполнен', class: 'is-danger' }
};
const payment = {
  1: 'Наличными',
  2: 'Приват',
  3: 'Безнал'
};
const delivery = {
  1: 'Курьером',
  2: 'Новой Почтой',
  3: 'Интаймом'
};

export default {
  name: 'Orders',
  components: {
    CardComponent,
    OrdersDetail,
    OrdersProducts
  },
  data () {
    return {
      statuses: Object.entries(status)
    }
  },
  computed: mapGetters({ orders: 'getOrders' }),
  mounted () {
    if (!this.orders.length) {
      this.$store.dispatch('fetchOrders');
    }
  },
  methods: {
    statusClass (key) {
      return status[key].class;
    },

    statusValue (key) {
      return status[key].title;
    },

    paymentValue (key) {
      return payment[key];
    },

    deliveryValue (key) {
      return delivery[key];
    },

    addressValue (addressObj) {
      return addressObj
        ? Object.entries(addressObj).reduce((acc, el) => [...acc, el], [])
        : addressObj;
    },

    async updateOrder (row) {
      this.setLoadingState();
      await this.$store.dispatch('updateOrder', row);
      this.setReadyState();
    },

    async deleteOrder (id) {
      this.setLoadingState();
      await this.$store.dispatch('deleteOrder', id);
      this.setReadyState();
    }
  }
}
</script>

<style>
/*.order-status-2 select {*/
/*  background-color: red !important;*/
/*}*/
</style>
