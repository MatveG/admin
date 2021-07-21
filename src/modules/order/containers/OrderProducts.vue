<template>
  <card-component>
    <b-table :data="products">
      <b-table-column v-for="(column, index) in columns"
                      :key="index"
                      :field="column.field"
                      :label="column.label"
                      :centered="column.centered"
                      sortable
                      v-slot="props">
        {{ column.field.split('.').reduce((acc, value) => acc[value], props.row) }}
      </b-table-column>
      <b-table-column v-slot="props" centered sortable label="Кол-во" field="amount" width="15%">
        <b-numberinput :value="props.row.amount" @input="amount"
                       size="is-small" min="1" controls-position="compact"/>
      </b-table-column>
      <b-table-column v-slot="props" centered label="*" width="10%">
        <remove-button @click="remove"/>
      </b-table-column>
    </b-table>

    <b-field class="mt-5" label="Добавить товар" label-position="on-border">
      <b-autocomplete
          v-model="autocomplete"
          :data="autocompleteData"
          clearable
          @select="option => add(option)"
          field="model"
          placeholder="Поиск товара"
          icon="magnify"/>
    </b-field>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import RemoveButton from '@/components/buttons/RemoveButton'
import useProductState from '@/modules/product/compositions/useProductState'
import { ref, computed, onMounted } from '@vue/composition-api'

export default {
  name: 'OrdersProducts',
  components: {
    CardComponent,
    RemoveButton
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    add (option) {
      console.log('add', option);
      this.autocomplete = '';
    },
    amount (option) {
      console.log('amount', option);
    },
    remove (option) {
      console.log('remove', option);
    }
  },
  setup () {
    const { products, fetchProducts } = useProductState();

    const autocomplete = ref('');
    const autocompleteData = computed(() => {
      const searchStr = autocomplete.value.toLowerCase();

      return products.value.filter((product) => (
        product.id.toString().toLowerCase().includes(searchStr) ||
        (product.code || '').toString().toLowerCase().includes(searchStr) ||
        `${product.title} ${product.brand} ${product.model}`.toLowerCase().includes(searchStr)
      ));
    });

    onMounted(() => fetchProducts());

    return {
      autocomplete,
      autocompleteData,
      columns: [
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
          field: 'product.price',
          label: 'Цена',
          centered: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
