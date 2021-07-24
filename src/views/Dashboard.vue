<template>
  <section class="section is-main-section">
    <component-tiles>
      <card-widget
          :number="stats.ordersCount"
          class="tile is-child"
          label="Заказов"
          type="is-info"
          icon="cart-outline"/>
      <card-widget
          :number="stats.commentsCount"
          class="tile is-child"
          label="Отзывов"
          type="is-primary"
          icon="account-multiple"/>
      <card-widget
          :number="stats.productsCount"
          class="tile is-child"
          label="Товаров"
          type="is-success"
          icon="shopping-outline"/>
      <card-widget
          :number="stats.categoriesCount"
          class="tile is-child"
          label="Категорий"
          type="is-success"
          icon="file-tree"/>
    </component-tiles>

    <component-tiles>
      <card-component has-button-slot class="tile is-child"
                      title="Последние заказы" icon="basket-outline">
        <refresh-button slot="button" @click="loadApiData"/>
        <b-table
            :data="orders"
            :columns="orderColumns"
            :per-page="10"
            :default-sort="['id', 'desc']"
            hoverable/>
      </card-component>

      <card-component has-button-slot class="tile is-child"
                      title="Последние комментарии" icon="comment-text-outline">
        <refresh-button slot="button" @click="loadApiData"/>
        <b-table
            :data="comments"
            :columns="commentColumns"
            :per-page="10"
            :default-sort="['id', 'desc']"
            hoverable/>
      </card-component>
    </component-tiles>
  </section>
</template>

<script>
import axios from '@/loaders/axios';
import api from '@/api';
import ComponentTiles from '@/components/ComponentTiles';
import CardWidget from '@/components/CardWidget';
import CardComponent from '@/components/CardComponent';
import RefreshButton from '@/components/buttons/RefreshButton';
import useGlobalLoader from '@/compositions/useGlobalLoader';

export default {
  name: 'home',
  components: {
    ComponentTiles,
    RefreshButton,
    CardComponent,
    CardWidget
  },
  data () {
    return {
      stats: {},
      orders: [],
      comments: []
    };
  },
  mounted () {
    this.loadApiData();
  },
  methods: {
    async loadApiData () {
      this.globalLoading();
      try {
        const { data } = await axios(api.fetchRoot());
        const { lastOrders, lastComments, ...stats } = data;
        this.stats = stats;
        this.orders = lastOrders;
        this.comments = lastComments;
      } catch (error) {
        throw error;
      }
      this.globalReady();
    }
  },
  setup () {
    const orderColumns = [
      {
        field: 'id',
        centered: true
      },
      {
        field: 'client'
      },
      {
        field: 'phone'
      },
      {
        field: 'total',
        centered: true
      }
    ];
    const commentColumns = [
      {
        field: 'id',
        centered: true
      },
      {
        field: 'rating',
        centered: true
      },
      {
        field: 'author',
        centered: true
      },
      {
        field: 'text',
        centered: true
      }
    ];

    return {
      orderColumns,
      commentColumns,
      ...useGlobalLoader()
    };
  }
};
</script>
