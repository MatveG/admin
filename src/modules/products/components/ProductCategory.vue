<template>
  <card-component :title="`ID товара: ${product.id || ''}`" icon="shape" class="tile is-child">
    <b-field class="has-text-centered">
      <b-switch v-model="product.is_active">Активен</b-switch>
    </b-field>
    <div class="has-text-centered buttons is-centered">
      <b-button label="Посмотреть на сайте" tag="a" to="/"/>
    </div>

    <b-field
        label="Категория"
        label-position="on-border"
        :type="{ 'is-danger': v.category_id.$error }">
      <b-select
          expanded
          v-model="product.category_id"
          @select="$emit('changed')">
        <template v-for="(category, idx) in categories">
          <optgroup
              v-if="category.is_parent"
              :label="category.title"
              :key="idx">
            <option
                v-for="(child, idx2) in category.children"
                :value="child.id"
                :key="idx2">
              {{ child.title }}
            </option>
          </optgroup>

          <option
              v-else
              :value="category.id"
              :key="idx">
            {{ category.title }}
          </option>
        </template>
      </b-select>
    </b-field>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'ProductCategory',
  components: {
    CardComponent
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    },
    v: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>

</style>
