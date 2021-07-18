<template>
    <section class="section is-main-section">
       <card-component class="has-table has-mobile-sort-spaced" title="Категории" icon="file-tree">
          <categories-table/>
        </card-component>
    </section>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import CategoriesTable from '../containers/CategoriesTable'
import useCategoryState from '@/modules/category/compositions/useCategoryState'

export default {
  name: 'CategoryMain',
  components: {
    CardComponent,
    CategoriesTable
  },
  mounted () {
    this.fetchCategories();
  },
  setup () {
    const { fetchCategories } = useCategoryState();
    return {
      fetchCategories
    }
  }
}
</script>

<style scoped>

</style>
