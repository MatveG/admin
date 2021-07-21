<template>
  <section class="section is-main-section">
    <card-component class="has-table has-mobile-sort-spaced" title="Заказы" icon="basket-outline">
      <orders-toolbar :settings="settings" @toggle="toggleFilter" @reset="resetFilters"/>

      <b-table
          :data="orders"
          :per-page="25"
          :loading="isLoading"
          ref="table"
          detailed
          paginated
          detail-key="id"
          default-sort="id"
          default-sort-direction="desc"
          :row-class="(row) => 'order-status-' + row.status">

        <b-table-column v-slot="props" centered sortable
            label="ID" field="id" width="10%">
          {{props.row.id}}
        </b-table-column>

        <b-table-column v-slot="props" sortable centered
            label="Оплата" field="payment" width="15%">
          {{settings.payment[props.row.payment]}}
        </b-table-column>

        <b-table-column v-slot="props" sortable centered
            label="Доставка" field="delivery" width="15%">
          {{settings.delivery[props.row.delivery]}}
        </b-table-column>

        <b-table-column v-slot="props" centered searchable
            label="Клиент" field="phone" width="25%">
          <p>{{props.row.client}}</p>
          {{props.row.phone}}
        </b-table-column>

        <b-table-column v-slot="props" sortable centered
            label="Статус" field="status" width="15%">
          <b-field>
            <b-select class="order-status-1"
                v-model="props.row.status"
                @input="updateOrdersRow(props.row)">
              <option v-for="(status, idx) in statuses" :key="idx" :value="status[0]" :class="`order-status-${status[0]}`">
                {{status[1]}}
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
          <orders-details :row="props.row" :settings="settings" :currency="$settings('currency')"/>
          <orders-products :products="props.row.products"/>
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
import OrdersDetails from '../components/OrdersDetails'
import OrdersProducts from '../containers/OrderProducts'
import useTableFilters from '@/compositions/useTableFilters'
import useOrderState from '../compositions/useOrderState'

export default {
  name: 'Orders',
  components: {
    CardComponent,
    EditButton,
    RemoveButton,
    OrdersToolbar,
    OrdersDetails,
    OrdersProducts
  },
  mounted () {
    this.fetchOrders();
  },
  setup (props, context) {
    const settings = context.root.$settings('order');
    const statuses = Object.entries(settings.status);

    return {
      settings,
      statuses,
      ...useOrderState(),
      ...useTableFilters(props, context)
    };
  }
}
</script>

<style>
tr.order-status-1 td:first-child {
  border-left: solid 7px #1abc9c;
}
tr.order-status-2 td:first-child {
  border-left: solid 7px #f1c40f;
}
tr.order-status-3 td:first-child {
  border-left: solid 7px #9b59b6;
}
tr.order-status-4 td:first-child {
  border-left: solid 7px #e67e22;
}
tr.order-status-5 td:first-child {
  border-left: solid 7px #3498db;
}
tr.order-status-6 td:first-child {
  border-left: solid 7px #e74c3c;
}
tr.order-status-7 td:first-child {
  border-left: solid 7px #2ecc71;
}
tr.order-status-8 td:first-child {
  border-left: solid 7px #7f8c8d;
}
tr.order-status-9 td:first-child {
  border-left: solid 7px #2c3e50;
}
</style>
