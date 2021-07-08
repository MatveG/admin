<template>
  <section class="section is-main-section">
    <card-component class="has-table has-mobile-sort-spaced" title="Товары" icon="basket">
      <product-toolbar :toggled="filters" @toggle="toggleFilter"/>

      <b-table ref="table"
               :data="products"
               :checked-rows="checked"
               :per-page="perPage"
               :loading="loading"
               paginated checkable hoverable
               class="valign-center"
               default-sort="id"
               default-sort-direction="desc">
        <b-table-column
            label="Фото"
            field="thumb"
            width="12%"
            centered
            v-slot="props">
          <img :src="props.row.thumb" alt="">
        </b-table-column>

        <b-table-column
            label="Код"
            field="id"
            width="8%"
            sortable
            searchable
            centered
            v-slot="props">
          {{props.row.id }}
        </b-table-column>

        <b-table-column
            label="Артикул"
            field="code"
            cell-class="is-italic"
            width="10%"
            sortable
            searchable
            centered
            v-slot="props">
          {{ props.row.code }}
        </b-table-column>

        <b-table-column
            label="Модель"
            field="model"
            width="20%"
            sortable
            searchable
            v-slot="props">
          {{ props.row.model }}
        </b-table-column>

        <b-table-column
            label="Бренд"
            field="brand"
            cell-class="is-italic"
            width="10%"
            sortable
            searchable
            v-slot="props">
          {{ props.row.brand }}
        </b-table-column>

        <b-table-column
            label="Категория"
            field="category.title"
            width="10%"
            sortable
            searchable
            v-slot="props">
          {{ props.row.category.title }}
        </b-table-column>

        <b-table-column
            label="Цена"
            field="price"
            cell-class="is-italic"
            width="10%"
            sortable
            centered
            v-slot="props">
          {{ props.row.price }}
        </b-table-column>

        <b-table-column
            field="is_active"
            label="Активен"
            width="12%"
            sortable
            centered
            v-slot="props">
          <b-checkbox
              v-model="props.row.is_active"
              @change.native="update(props.row)"
              class="is-small" />
        </b-table-column>

        <b-table-column
            label="*"
            cell-class="buttons is-flex-wrap-nowrap"
            custom-key="actions"
            width="13%"
            centered
            v-slot="props">
            <b-button
                :to="{ name: 'product.edit', params: { propId: props.row.id } }"
                tag="router-link"
                type="is-primary"
                icon-right="square-edit-outline"
                slot="trigger"/>
            <b-button
                @click="confirmDelete(() => delete(props.row.id))"
                type="is-danger"
                icon-right="delete"
                slot="trigger"/>
        </b-table-column>
      </b-table>
    </card-component>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainView from '@/commons/MainView'
import CardComponent from '@/components/CardComponent';
import ProductToolbar from '@/modules/products/components/ProductToolbar'

export default {
  name: 'ProductMain',
  extends: MainView,
  components: {
    CardComponent,
    ProductToolbar
  },
  computed: mapGetters({
    products: 'getProducts'
  }),
  mounted () {
    if (!this.products.length) {
      this.fetchProducts();
    }
  },
  methods: {
    async update (row) {
      this.setLoadingState();
      await this.updateProduct(row);
      this.setReadyState();
    },

    async delete (id) {
      this.setLoadingState();
      await this.deleteProduct(id);
      this.setReadyState();
    },

    ...mapActions([
      'fetchProducts',
      'updateProduct',
      'deleteProduct'
    ])
  }
}
</script>

<style scoped>

</style>
