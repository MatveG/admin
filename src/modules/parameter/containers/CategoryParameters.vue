<template>
  <div>
    <b-loading :is-full-page="false" :active="isLoading"/>
    <category-properties
        :properties="parameters"
        :data-types="$settings('shop', 'parameters')"
        @store="storeParametersRow({ ...$event, category_id: categoryId })"
        @update="updateParametersRow"
        @remove="removeParametersRow"/>
  </div>
</template>

<script>
import CategoryProperties from '@/containers/CategoryProperties';
import useParameterState from '../compositions/useParameterState';

export default {
  name: 'CategoryParameters',
  components: { CategoryProperties },
  props: {
    categoryId: {
      type: Number,
      required: true
    }
  },
  mounted () {
    this.fetchParameters(this.categoryId);
  },
  setup () {
    return {
      ...useParameterState()
    };
  }
};
</script>

<style scoped>

</style>
