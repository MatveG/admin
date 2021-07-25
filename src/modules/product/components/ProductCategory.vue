<template>
  <card-component
      :title="`ID товара: ${product.id || ''}`"
      :hasButtonSlot="true"
      icon="shape"
      class="tile is-child">
    <template v-slot:button>
      <b-button icon-left="open-in-new" size="is-small" tag="a" to="/"/>
    </template>

    <b-field class="has-text-centered">
      <b-switch v-model="product.is_active">Активен</b-switch>
    </b-field>

    <b-field :type="{ 'is-danger': $v.product.category_id.$error }"
        label="Категория" label-position="on-border">
      <b-select v-model="product.category_id" expanded>
        <template v-for="(category, idx) in categories.filter((el) => el.parent_id === 0)">
          <optgroup
              v-if="category.is_parent"
              :label="category.title"
              :key="idx">
            <option
                v-for="(child, idx2) in categories.filter((el) => el.parent_id === category.id)"
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
import CardComponent from '@/components/CardComponent';

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
    $v: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style scoped>

</style>
