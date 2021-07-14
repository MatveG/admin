<template>
    <section class="section is-main-section">
       <card-component class="has-table has-mobile-sort-spaced" title="Категории" icon="file-tree">
          <categories-toolbar @toggle="toggleFilter"/>
          <categories-table :parent-id="0" :filters="filters"/>
        </card-component>
    </section>
</template>

<script>
import { useActions } from 'vuex-composition-helpers'
import CardComponent from '@/components/CardComponent';
import CategoriesTable from '../containers/CategoriesTable';
import CategoriesToolbar from '../components/CategoriesToolbar';
import useGlobalLoader from '@/compositions/useGlobalLoader'

export default {
  name: 'CategoryMain',
  components: {
    CardComponent,
    CategoriesTable,
    CategoriesToolbar
  },
  data () {
    return {
      filters: {}
    }
  },
  async mounted () {
    this.globalLoading();
    await this.fetchCategories();
    this.globalReady();
  },
  methods: {
    toggleFilter (name) {
      this.filters = { ...this.filters, [name]: !this.filters[name] };
    }
  },
  setup () {
    return {
      ...useGlobalLoader(),
      ...useActions([
        'fetchCategories'
      ])
    }
  }
}
</script>

<style scoped>

</style>
