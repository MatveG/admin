<template>
  <card-component title="Основная информация" icon="image-text">
    <b-tabs v-model="tab" type="is-boxed">
      <b-tab-item label="Название">
        <b-field label="Название" message="Пример: Конфеты" horizontal>
          <b-input v-model="product.title" required />
        </b-field>
        <b-field label="Бренд" message="Пример: M&M's" horizontal>
          <b-input v-model="product.brand" required />
        </b-field>
        <b-field label="Модель" message="Пример: Milk Chocolate" horizontal
                 :type="{ 'is-danger': $v.product.model.$error }">
          <b-input v-model="product.model" required />
        </b-field>
      </b-tab-item>

      <b-tab-item label="Описание">
        <b-field label="Короткое описание" horizontal>
          <b-input v-model="product.summary" type="textarea" />
        </b-field>
        <b-field label="Полное описание" horizontal>
          <b-input v-model="product.description" type="textarea" />
        </b-field>
      </b-tab-item>

      <b-tab-item label="Характеристики">
<!--        <product-features v-if="product.category" :prop-features="product.category.features" ref="features" />-->
        <product-features v-if="false" :prop-features="product.category.features" ref="features" />
      </b-tab-item>

      <b-tab-item label="SEO">
        <b-field label="URL товара" horizontal>
          <b-input v-model="product.slug" custom-class="is-static" readonly />
        </b-field>
        <b-field label="Заголовок" message="Тег title" horizontal>
          <b-input v-model="product.seo_title" />
        </b-field>
        <b-field label="Описание" message="Тег description" horizontal>
          <b-input v-model="product.seo_description" />
        </b-field>
        <b-field label="Ключевые слова" message="Тег keywords" horizontal>
          <b-input v-model="product.seo_keywords" />
        </b-field>
      </b-tab-item>
    </b-tabs>
  </card-component>
</template>

<script>
import { mapGetters } from 'vuex'
import CardComponent from '@/components/CardComponent'
import ProductFeatures from './ProductFeatures'

export default {
  name: 'ProductMain',
  components: {
    CardComponent,
    ProductFeatures
  },
  props: {
    $v: Object
  },
  data () {
    return {
      tab: 0
    }
  },
  computed: mapGetters([
    'product'
  ])
}
</script>

<style scoped>

</style>
