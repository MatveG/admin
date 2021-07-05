<template>
  <section class="section is-main-section">
    <card-component class="has-table has-mobile-sort-spaced" title="Товары" icon="basket">
      <products-toolbar :toggled="filters" @toggle="toggleFilter"/>

      <b-table ref="table"
               :data="products"
               :checked-rows="checked"
               :per-page="perPage"
               :loading="loading"
               paginated checkable hoverable
               class="valign-center"
               default-sort="id"
               default-sort-direction="desc">
        <b-table-column label="Фото" field="thumb" width="12%" centered v-slot="props">
          <img :src="props.row.thumb" alt="">
        </b-table-column>

        <b-table-column label="Код" field="id" width="8%" sortable searchable centered v-slot="props">
          {{props.row.id }}
        </b-table-column>

        <b-table-column label="Артикул" field="code" cell-class="is-italic" width="10%" sortable searchable centered v-slot="props">
          {{ props.row.code }}
        </b-table-column>

        <b-table-column label="Модель" field="model" width="20%" sortable searchable v-slot="props">
          {{ props.row.model }}
        </b-table-column>

        <b-table-column label="Бренд" field="brand" cell-class="is-italic" width="10%" sortable searchable v-slot="props">
          {{ props.row.brand }}
        </b-table-column>

        <b-table-column label="Категория" field="category.title" width="10%" sortable searchable v-slot="props">
          {{ props.row.category.title }}
        </b-table-column>

        <b-table-column label="Цена" field="price" cell-class="is-italic" width="10%" sortable searchable centered v-slot="props">
          {{ props.row.price }}
        </b-table-column>

        <b-table-column field="is_active" label="Активен" width="12%" sortable centered v-slot="props">
          <b-checkbox v-model="props.row.is_active" @change.native="updateProduct(props.row)" class="is-small" />
        </b-table-column>

        <b-table-column label="*" cell-class="buttons is-flex-wrap-nowrap" custom-key="actions" width="13%" centered v-slot="props">
            <b-button type="is-primary" icon-right="square-edit-outline" slot="trigger" tag="router-link"
                      :to="{ name: 'products.edit', params: { propId: props.row.id } }"/>
            <b-button type="is-danger" icon-right="delete" slot="trigger"
                      @click="confirmDelete(() => deleteProduct(props.row.id))"/>
        </b-table-column>
      </b-table>
    </card-component>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import TableView from '@/commons/TableView'
import CardComponent from '@/components/CardComponent';
import ProductsToolbar from '@/modules/products/components/ProductsToolbar'

export default {
  name: 'Products',
  extends: TableView,
  components: {
    CardComponent,
    ProductsToolbar
  },
  computed: mapGetters({
    products: 'getProducts'
  }),
  mounted () {
    if (!this.products.length) {
      this.$store.dispatch('fetchProducts');
    }
  },
  methods: {
    async updateProduct (row) {
      this.setLoadingState();
      await this.$store.dispatch('updateProduct', row);
      this.setReadyState();
    },

    async deleteProduct (id) {
      this.setLoadingState();
      await this.$store.dispatch('deleteProduct', id);
      this.setReadyState();
    }
  }
}
</script>

<style scoped>

</style>
