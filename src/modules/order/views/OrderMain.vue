<template>
  <section class="section is-main-section">
    <card-component class="has-table has-mobile-sort-spaced" title="Заказы" icon="basket-outline">
      <orders-toolbar :statuses="statuses"/>

      <b-table
          :data="orders"
          :per-page="25"
          :loading="isLoading"
          ref="table"
          detailed
          paginated
          hoverable
          detail-key="id"
          default-sort="id"
          default-sort-direction="desc">

        <b-table-column v-slot="props" centered sortable
            label="ID" field="id" width="10%">
          {{props.row.id}}
        </b-table-column>

        <b-table-column v-slot="props" sortable centered
            label="Оплата" field="payment" width="15%">
          {{paymentValue(props.row.payment)}}
        </b-table-column>

        <b-table-column v-slot="props" sortable centered
            label="Доставка" field="delivery" width="15%">
          {{deliveryValue(props.row.delivery)}}
        </b-table-column>

        <b-table-column v-slot="props" centered searchable
            label="Клиент" field="phone" width="25%">
          <p>{{props.row.client}}</p>
          {{props.row.phone}}
        </b-table-column>

        <b-table-column v-slot="props" sortable centered
            label="Статус" field="status" width="15%">
          <b-field :type="statusClass(props.row.status)">
            <b-select v-model="props.row.status" @input="updateOrdersRow(props.row)">
              <option v-for="(status, idx) in statuses" :key="idx" :value="status[0]">
                {{status[1].title}}
              </option>
            </b-select>
          </b-field>
        </b-table-column>

        <b-table-column v-slot="props" centered custom-key="actions"
            cell-class="is-centered buttons is-flex-wrap-nowrap" label="*" width="15%">
          <edit-button :to="{ name: 'order.edit', params: { propId: props.row.id } }"/>
          <remove-button @click="removeOrdersRow(props.row)"/>
        </b-table-column>

        <template slot="detail" slot-scope="props">
          <order-details
              :row="props.row"
              :status="statusValue(props.row.status)"
              :payment="paymentValue(props.row.payment)"
              :delivery="deliveryValue(props.row.delivery)"
              :addresses="addressValue(props.row.address)"/>
          <order-products :products="props.row.products"/>
        </template>
      </b-table>
    </card-component>
  </section>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import EditButton from '@/components/buttons/EditButton'
import RemoveButton from '@/components/buttons/RemoveButton'
import OrdersToolbar from '../components/OrdersToolbar'
import OrderDetails from '../components/OrderDetails'
import OrderProducts from '../components/OrderProducts'
import useTableFilters from '@/compositions/useTableFilters'
import useOrderState from '../compositions/useOrderState'

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
    EditButton,
    RemoveButton,
    OrdersToolbar,
    OrderDetails,
    OrderProducts
  },
  data () {
    return {
      statuses: Object.entries(status)
    }
  },
  mounted () {
    this.fetchOrders();
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
    }
  },
  setup (props, context) {
    return {
      ...useOrderState(),
      ...useTableFilters(props, context)
    };
  }
}
</script>

<style scoped>

</style>
