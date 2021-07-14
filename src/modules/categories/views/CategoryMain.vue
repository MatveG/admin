<template>
    <section class="section is-main-section">
       <card-component class="has-table has-mobile-sort-spaced" title="Категории" icon="file-tree">
          <category-toolbar @toggle="toggleFilter"/>
          <category-table :categories="categories" :filters="filters"/>
        </card-component>
    </section>
</template>

<script>
import { useActions, useGetters } from 'vuex-composition-helpers'
import CardComponent from '@/components/CardComponent';
import CategoryTable from '../containers/CategoryTable';
import CategoryToolbar from '../components/CategoryToolbar';
import useGlobalLoader from '@/compositions/useGlobalLoader'

export default {
  name: 'CategoryMain',
  components: {
    CardComponent,
    CategoryTable,
    CategoryToolbar
  },
  data () {
    return {
      categories: [],
      filters: {}
    }
  },
  async mounted () {
    this.globalLoading();
    await this.fetchCategories();
    this.categories = JSON.parse(JSON.stringify(this.getCategories));
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
      ...useGetters([
        'getCategories'
      ]),
      ...useActions([
        'fetchCategories'
      ])
    }
  }
}
</script>

<style scoped>

</style>
