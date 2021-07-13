<template>
  <div>
    <b-loading :is-full-page="false" :active="isLoading"/>
    <category-properties
        :properties="parameters"
        :category-id="categoryId"
        :parent-id="0"
        :data-types="$settings('shop', 'parameters')"
        @store="store"
        @update="update"
        @remove="remove"/>
  </div>
</template>

<script>
import { useGetters, useActions } from 'vuex-composition-helpers'
import CategoryProperties from '@/components/CategoryProperties'
import useLoadingState from '@/compositions/useLoadingState'

export default {
  name: 'CategoryParameters',
  components: { CategoryProperties },
  props: {
    categoryId: {
      type: Number,
      required: true
    }
  },
  async mounted () {
    this.loadingState();
    await this.fetchParameters(this.categoryId);
    this.readyState();
  },
  methods: {
    async store (payload) {
      this.loadingState();
      await this.storeParameter(payload);
      this.readyState();
    },

    async update (payload) {
      this.loadingState();
      await this.updateParameter(payload);
      this.readyState();
    },

    async remove (id) {
      this.loadingState();
      await this.deleteParameter(id);
      this.readyState();
    }
  },
  setup () {
    return {
      ...useLoadingState(),
      ...useGetters({
        parameters: 'getParameters'
      }),
      ...useActions([
        'fetchParameters',
        'storeParameter',
        'updateParameter',
        'deleteParameter'
      ])
    };
  }
}
</script>

<style scoped>

</style>
