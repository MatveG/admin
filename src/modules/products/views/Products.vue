<template>
  <section class="section is-main-section">
    <card-component class="has-table has-mobile-sort-spaced" title="Товары" icon="basket">
      <products-toolbar :toggled="toggled" :toggle="toggle" :go-create="goCreate"/>

      <b-table ref="table"
               :data="products"
               :per-page="perPage"
               :loading="loading"
               :checked-rows="checked"
               custom-row-key="id"
               default-sort="['id', 'desc']"
               paginated
               striped
               checkable
               hoverable
               icon-pack="fa"
               class="valign-center">
        <b-table-column label="Фото" field="thumb" width="15%" centered v-slot="props">
            <div class="image">
                <img :src="props.row.thumb" class="is-rounded" alt="">
            </div>
        </b-table-column>

        <b-table-column label="Код" field="id" width="8%" searchable sortable centered v-slot="props">
          {{props.row.id }}
        </b-table-column>

        <b-table-column label="Артикул" field="code" width="12%" searchable sortable centered v-slot="props">
          <span class="is-italic">{{ props.row.code }}</span>
        </b-table-column>

        <b-table-column label="Модель" field="model" width="25%" searchable v-slot="props">
          {{ props.row.model }}
        </b-table-column>

        <b-table-column label="Бренд" field="brand" width="15%" searchable v-slot="props">
          <span class="is-italic">{{ props.row.brand }}</span>
        </b-table-column>

        <b-table-column label="Категория" field="category.title" width="15%" searchable v-slot="props">
          {{ (props.row.category || {}).title }}
        </b-table-column>

        <b-table-column field="is_active" label="Активен" width="10%" sortable centered v-slot="props">
          <b-checkbox v-model="props.row.is_active" @change.native="update(props.row)" class="is-small" />
        </b-table-column>

        <b-table-column custom-key="actions" width="10%" centered v-slot="props">
          <div class="buttons is-flex-wrap-nowrap">
            <b-button type="is-primary" icon-right="square-edit-outline" slot="trigger"
                      @click="goEdit(props.row.id)"/>
            <b-button type="is-danger" icon-right="delete" slot="trigger"
                      @click="confirmDelete(props.row.id)"/>
          </div>
        </b-table-column>
      </b-table>
    </card-component>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import settings from '@/mixins/settings'
import states from '@/mixins/states'
import CardComponent from '@/components/CardComponent';
import ProductsToolbar from '@/modules/products/components/ProductsToolbar'

export default {
  name: 'Products',
  mixins: [
    settings,
    states
  ],
  components: {
    CardComponent,
    ProductsToolbar
  },
  data () {
    return {
      perPage: 20,
      checked: [],
      toggled: {
        is_active: false,
        is_stock: false
      }
    }
  },
  computed: mapGetters(['products']),
  mounted () {
    if (!this.products.length) {
      this.$store.dispatch('fetchProducts');
    }
  },
  methods: {
    toggle (name) {
      this.toggled[name] = !this.toggled[name];
      this.$refs.table.filters = {
        ...this.$refs.table.filters,
        [name]: this.$refs.table.filters[name] ? null : 'true'
      };
    },

    goCreate () {
      window.open(
        this.$router.resolve({ name: 'products.create' }).href,
        '_blank'
      );
    },

    goEdit (propId) {
      window.open(
        this.$router.resolve({ name: 'products.edit', params: { propId } }).href,
        '_blank'
      );
    },

    confirmDelete (id) {
      this.$buefy.dialog.confirm({
        type: 'is-danger',
        hasIcon: true,
        icon: 'delete',
        message: 'Удалить?',
        onConfirm: () => this.delete(id)
      })
    },

    async update (row) {
      this.stateLoading();
      await this.$store.dispatch('updateProduct', row);
      this.stateSaved();
    },

    async delete (id) {
      this.stateLoading();
      await this.$store.dispatch('deleteProduct', id);
      this.stateSaved();
    }
  }
}
</script>

<style scoped>

</style>
