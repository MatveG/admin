<template>
  <div>
    <card-component>
      <b-table :data="products" :columns="columns"/>
    </card-component>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
const columns = [
  {
    field: 'product.thumb',
    label: 'Изображение',
    centered: true
  },
  {
    field: 'product.id',
    label: 'ID',
    centered: true
  },
  {
    field: 'product.code',
    label: 'Артикул'
  },
  {
    field: 'product.name',
    label: 'Наименование'
  },
  {
    field: 'amount',
    label: 'Кол-во',
    centered: true
  },
  {
    field: 'price',
    label: 'Цена',
    centered: true
  }
];

export default {
  name: 'OrdersProducts',
  components: { CardComponent },
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      columns
    }
  }
}
</script>

<style scoped>

</style>
