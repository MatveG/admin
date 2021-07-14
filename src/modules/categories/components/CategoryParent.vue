<template>
  <card-component
      :title="`ID категории: ${model.id || ''}`"
      :hasButtonSlot="true"
      icon="shape"
      class="tile is-child">
    <template v-slot:button>
      <b-button icon-left="open-in-new" size="is-small" tag="a" to="/"/>
    </template>

    <b-field class="has-text-centered">
      <b-switch v-model="model.is_active" @change.native="$emit('change')">
        Активная
      </b-switch>
    </b-field>

    <b-field class="has-text-centered">
      <b-switch v-model="model.is_parent" @change.native="$emit('change')">
        Корневая
      </b-switch>
    </b-field>

    <b-field :type="{ 'is-danger': v.parent_id.$error }"
             class="mt-5" label="Родительская категория" label-position="on-border">
      <b-select
          v-model="model.parent_id"
          @change.native="$emit('change')"
          expanded
          placeholder="Выберите">
        <option
            v-for="category in parentCategories"
            :value="category.id"
            :key="category.id">
          {{ category.title }}
        </option>
      </b-select>
    </b-field>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import useModelBinding from '@/compositions/useModelBinding'

export default {
  name: 'CategoryParent',
  components: {
    CardComponent
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    parentCategories: {
      type: Array,
      required: true
    },
    v: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, context) {
    return {
      ...useModelBinding(props, context)
    };
  }
}
</script>

<style scoped>

</style>
