<template>
  <section class="section is-main-section">
    <card-component class="has-table has-mobile-sort-spaced" title="Товары" icon="basket">
      <products-toolbar @toggle="toggleFilter"/>

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
          <b-switch v-model="props.row.is_active" @input="updateProductsRow(props.row)" outlined/>
        </b-table-column>

        <b-table-column label="*" custom-key="actions" width="13%" centered v-slot="props">
          <div class="buttons is-flex-wrap-nowrap">
            <edit-button :to="{ name: 'product.edit', params: { propId: props.row.id } }"/>
            <remove-button @click="removeProductsRow(props.row)"/>
          </div>
        </b-table-column>
      </b-table>
    </card-component>
  </section>
</template>

<script>
import CardComponent from '@/components/CardComponent';
import EditButton from '@/components/buttons/EditButton'
import RemoveButton from '@/components/buttons/RemoveButton'
import ProductsToolbar from '../components/ProductsToolbar'
import useTableFilters from '@/compositions/useTableFilters'
import useProductState from '../compositions/useProductState'

export default {
  name: 'ProductMain',
  components: {
    CardComponent,
    EditButton,
    RemoveButton,
    ProductsToolbar
  },
  data () {
    return {
      checked: []
    }
  },
  async mounted () {
    await this.fetchProducts();
  },
  setup (props, context) {
    return {
      ...useProductState(),
      ...useTableFilters(props, context)
    };
  }
}
</script>

<style scoped>

</style>
