<template>
  <div>
    <hero-bar-main/>

    <section class="section is-main-section">
      <tiles>
        <card-widget
            :number="512"
            class="tile is-child"
            label="Заказов"
            type="is-info"
            icon="cart-outline"/>
        <card-widget
            :number="512"
            class="tile is-child"
            label="Отзывов"
            type="is-primary"
            icon="account-multiple"/>
        <card-widget
            :number="512"
            class="tile is-child"
            label="Товаров"
            type="is-success"
            icon="shopping-outline"/>
        <card-widget
            :number="512"
            class="tile is-child"
            label="Категорий"
            type="is-success"
            icon="file-tree"/>
      </tiles>

      <card-component
          :has-button-slot="true"
          class="has-table has-mobile-sort-spaced"
          title="Последние заказы"
          icon="account-multiple">
        <refresh-button slot="button"/>

        <clients-table-sample data-url="/data-sources/clients.json"/>
      </card-component>
    </section>
  </div>
</template>

<script>
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import ClientsTableSample from '@/components/ClientsTableSample'
import HeroBarMain from '@/components/HeroBarMain'
import RefreshButton from '@/components/RefreshButton'

export default {
  name: 'home',
  components: {
    RefreshButton,
    HeroBarMain,
    ClientsTableSample,
    CardComponent,
    CardWidget,
    Tiles
  },
  methods: {
    actionSample () {
      this.$buefy.toast.open({
        message: 'Some action',
        type: 'is-info',
        queue: false
      })
    }
  }
}
</script>
