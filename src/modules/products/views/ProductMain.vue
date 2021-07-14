<template>
  <section class="section is-main-section">
    <card-component class="has-table has-mobile-sort-spaced" title="Товары" icon="basket">
      <products-toolbar :toggled="filters" @toggle="toggleFilter"/>

      <b-table
          :data="products"
          :checked-rows="checked"
          :loading="isLoading"
          :per-page="25"
          ref="table"
          paginated
          checkable
          hoverable
          class="valign-center"
          default-sort="id"
          default-sort-direction="desc">

        <b-table-column label="Фото" field="thumb" width="12%" centered v-slot="props">
          <img :src="props.row.thumb" alt="">
        </b-table-column>

        <b-table-column label="Код" field="id" width="8%"
            sortable searchable centered v-slot="props">
          {{props.row.id }}
        </b-table-column>

        <b-table-column label="Артикул" field="code" cell-class="is-italic" width="10%"
            sortable searchable centered v-slot="props">
          {{ props.row.code }}
        </b-table-column>

        <b-table-column label="Модель" field="model" width="20%"
            sortable searchable v-slot="props">
          {{ props.row.model }}
        </b-table-column>

        <b-table-column label="Бренд" field="brand" cell-class="is-italic" width="10%"
            sortable searchable v-slot="props">
          {{ props.row.brand }}
        </b-table-column>

        <b-table-column label="Категория" field="category.title" width="10%"
            sortable searchable v-slot="props">
          {{ props.row.category.title }}
        </b-table-column>

        <b-table-column label="Цена" field="price" cell-class="is-italic" width="10%"
            sortable centered v-slot="props">
          {{ props.row.price }}
        </b-table-column>

        <b-table-column field="is_active" label="Активен" width="12%"
            sortable centered v-slot="props">
          <b-switch
              :value="props.row.is_active"
              @input="update(props.row, 'is_active', $event)"
              outlined/>
        </b-table-column>

        <b-table-column label="*" custom-key="actions" width="13%" centered v-slot="props">
          <div class="buttons is-flex-wrap-nowrap">
            <b-button
                :to="{ name: 'product.edit', params: { propId: props.row.id } }"
                outlined
                tag="router-link"
                type="is-primary"
                icon-right="square-edit-outline"
                slot="trigger"/>
            <b-button
                @click="remove(props.row.id)"
                outlined
                type="is-danger"
                icon-right="delete"
                slot="trigger"/>
          </div>
        </b-table-column>
      </b-table>
    </card-component>
  </section>
</template>

<script>
import { useActions, useGetters } from 'vuex-composition-helpers'
import CardComponent from '@/components/CardComponent';
import ProductsToolbar from '../components/ProductsToolbar'
import useDialogs from '@/compositions/useDialogs'
import useLoadingState from '@/compositions/useLoadingState'

export default {
  name: 'ProductMain',
  components: {
    CardComponent,
    ProductsToolbar
  },
  data () {
    return {
      checked: [],
      filters: {}
    }
  },
  mounted () {
    if (!this.products.length) {
      this.fetchProducts();
    }
  },
  methods: {
    async update (row, prop, value) {
      this.loadingState();
      await this.updateInProducts({ ...row, [prop]: value });
      this.readyState();
    },

    remove (id) {
      this.confirmDelete(async () => {
        this.loadingState();
        await this.removeFromProducts(id);
        this.readyState();
      });
    },

    toggleFilter (name) {
      const table = this.$refs.table;
      this.filters[name] = !this.filters[name];
      this.$set(table.filters, name, table.filters[name] ? null : 'true')
    }
  },
  setup (props, context) {
    return {
      ...useDialogs(props, context),
      ...useLoadingState(),
      ...useGetters({
        products: 'getProducts'
      }),
      ...useActions([
        'fetchProducts',
        'updateInProducts',
        'removeFromProducts'
      ])
    };
  }
}
</script>

<style scoped>

</style>
