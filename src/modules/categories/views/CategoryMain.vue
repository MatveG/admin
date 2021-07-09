<template>
    <section class="section is-main-section">
       <card-component class="has-table has-mobile-sort-spaced" title="Категории" icon="file-tree">
          <category-toolbar :toggled="filters" @toggle="toggleFilter"/>
          <category-table :categories="categories"/>
        </card-component>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CardComponent from '@/components/CardComponent';
import CategoryTable from '../containers/CategoryTable';
import CategoryToolbar from '../components/CategoryToolbar';

export default {
  name: 'CategoryMain',
  components: {
    CardComponent,
    CategoryTable,
    CategoryToolbar
  },
  data () {
    return {
      filters: {}
    }
  },
  computed: {
    ...mapGetters({
      categories: 'getCategories'
    })
  },
  mounted () {
    this.fetchCategories();
  },
  methods: {
    toggleFilter (name) {
      this.filters[name] = !this.filters[name];
      this.$set(this.$refs.table.filters, name, this.$refs.table.filters[name] ? null : 'true')
    },

    ...mapActions([
      'fetchCategories'
    ])
  }
}
</script>

<style scoped>

</style>
