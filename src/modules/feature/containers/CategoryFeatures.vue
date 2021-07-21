<template>
  <div>
    <b-loading :is-full-page="false" :active="isLoading"/>
    <category-properties
        :properties="features"
        :data-types="$settings('shop', 'features')"
        @store="storeFeaturesRow({ ...$event, category_id: categoryId })"
        @update="updateFeaturesRow"
        @remove="removeFeaturesRow"/>
  </div>
</template>

<script>
import CategoryProperties from '@/components/CategoryProperties'
import useFeatureState from '../compositions/useFeatureState'

export default {
  name: 'CategoryFeatures',
  components: { CategoryProperties },
  props: {
    categoryId: {
      type: Number,
      required: true
    }
  },
  mounted () {
    this.fetchFeatures(this.categoryId);
  },
  setup () {
    return {
      ...useFeatureState()
    };
  }
}
</script>

<style scoped>

</style>
