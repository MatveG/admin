<template>
  <section class="section is-main-section">
    <div class="buttons is-right">
      <b-button type="is-primary" icon-right="plus-circle" @click="addItem"/>
    </div>

    <card-component class="has-table has-mobile-sort-spaced" title="Товары" icon="basket">
      <b-table ref="table"
               :data="products"
               :per-page="perPage"
               :paginated="paginated"
               :loading="loading"
               :checked-rows="checked"
               custom-row-key="id"
               default-sort="['id', 'desc']"
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
          {{props.row.category.title}}
        </b-table-column>

        <b-table-column field="is_active" label="Активен" width="10%" sortable centered v-slot="props">
          <b-checkbox v-model="props.row.is_active" @change.native="update(props.row)" class="is-small" />
        </b-table-column>

        <b-table-column custom-key="actions" width="10%" centered v-slot="props">
          <b-dropdown hoverable :expanded="false" aria-role="list" class="dropdown-buttons">
            <b-button type="is-primary" icon-right="circle-edit-outline" slot="trigger" @click="editItem(props.row.id)"/>

            <b-dropdown-item @click="createChild(props.row)">
              <b-icon pack="fas" icon="plus" />
            </b-dropdown-item>

            <b-dropdown-item @click="confirmDestroy(props.row)">
              <b-icon pack="fas" icon="trash" />
            </b-dropdown-item>
          </b-dropdown>
        </b-table-column>
      </b-table>
    </card-component>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { states } from '@/mixins/states';
import CardComponent from '@/components/CardComponent';

export default {
  name: 'ProductIndex',

  mixins: [states],

  components: {
    CardComponent
  },

  data () {
    return {
      checked: [],
      perPage: null
    }
  },

  computed: {
    ...mapGetters(['settings', 'products']),

    paginated () {
      return this.perPage < this.products.length;
    }
  },

  watch: {
    'checked': function () {
      console.log(this.checked.length);
    }
  },

  mounted () {
    this.perPage = 10; // this.settings('categories', 'items_per_page');
    this.$store.dispatch('fetchCategories');
    this.$store.dispatch('fetchProducts');

    // setTimeout(() => console.log(this.products[0]), 1000);
  },

  methods: {
    addItem () {
      window.open(
        this.$router.resolve({ name: 'products-create' }).href,
        '_blank'
      );
    },

    editItem (propId) {
      window.open(
        this.$router.resolve({ name: 'products-edit', params: { propId } }),
        '_blank'
      );
    },

    async update (row) {
      this.stateLoading();
      await this.$store.dispatch('patchProduct', row);
      this.stateSaved();
    },

    async destroy (row) {
      this.stateLoading();
      await this.$store.dispatch('destroyProduct', row);
      this.stateSaved();
    },

    confirmDestroy (row) {
      this.confirm('Удалить?', this.destroy.bind(null, row));
    },

    getCategoryTitle (id) {
      return (this.$store.getters.getCategoryById(id) || {}).title;
    }
  }
}
</script>
