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
        Подкатегории
      </b-switch>
    </b-field>

    <b-field class="mt-5" label="Родительская категория" label-position="on-border">
      <b-autocomplete
          v-model="autocomplete"
          :data="filteredParentCategories"
          :open-on-focus="true"
          keep-first
          clearable
          @select="selectParent"
          field="title"/>
    </b-field>
  </card-component>
</template>

<script>
import useModelBinding from '@/hooks/useModelBinding'
import CardComponent from '@/components/CardComponent'

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
    }
    // v: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  data () {
    return {
      autocomplete: ''
    }
  },
  computed: {
    filteredParentCategories () {
      return this.parentCategories.filter((option) => option.id !== this.model.id &&
          option.title.toLowerCase().indexOf(this.autocomplete.toLowerCase()) >= 0)
    }
  },
  watch: {
    'model.parent_id': function () {
      const parentCategory = this.parentCategories.find((el) => el.id === this.model.parent_id) || {};
      this.autocomplete = parentCategory.title || '';
    }
  },
  setup (props, context) {
    return { ...useModelBinding(props, context) };
  },
  methods: {
    selectParent (parent) {
      if (parent) {
        this.model.parent_id = parent.id;
        this.$emit('change');
      }
    }
  }
}
</script>

<style scoped>

</style>
