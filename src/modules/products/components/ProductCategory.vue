<template>
  <card-component :title="`ID товара: ${product.id || ''}`" icon="shape" class="tile is-child">
    <b-field class="has-text-centered">
      <b-switch v-model="product.is_active">
        Активен
      </b-switch>
    </b-field>
    <div class="has-text-centered">
      <p>
        <a href="" class="button" target="_blank">
          Посмотреть на сайте
        </a>
      </p>
    </div>
    <b-field label="Категория" label-position="on-border" class="mt-5"
             :type="{ 'is-danger': $v.product.category_id.$error }">
      <b-select v-model="product.category_id" @select="changed" expanded>
        <div v-for="(category, idx) in categories" :key="idx">
          <optgroup v-if="category.is_parent" :label="category.title">
            <option v-for="(child, idx) in category.child" :key="idx" :value="child.id">{{ child.title }}</option>
          </optgroup>
          <option v-else :value="category.id">{{ category.title }}</option>
        </div>
      </b-select>
    </b-field>
  </card-component>
</template>

<script>
import { mapGetters } from 'vuex'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'ProductCategory',
  components: {
    CardComponent
  },
  props: {
    $v: Object,
    changed: Function
  },
  computed: mapGetters([
    'product',
    'categories'
  ])
}
</script>

<style scoped>

</style>
