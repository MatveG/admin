<template>
    <section class="section is-main-section">
       <card-component class="has-table has-mobile-sort-spaced" title="Категории" icon="basket">
        <!--<categories-toolbar :toggled="filters" @toggle="toggleFilter"/>-->
            <category-table :categories="categories"/>
        </card-component>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CardComponent from '@/components/CardComponent';
import CategoryTable from '../containers/CategoryTable';

export default {
  name: 'Categories',
  components: {
    CardComponent,
    CategoryTable
  },
  computed: {
    ...mapGetters({
      categories: 'getCategories'
    })
  },
  mounted () {
    this.$store.dispatch('fetchCategories');
  }
}
</script>
