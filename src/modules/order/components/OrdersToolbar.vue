<template>
  <card-toolbar slot="toolbar" class="is-upper">
    <div slot="left">
      <b-field>
        <b-select placeholder="Фильтр статуса" @select="$emit('toggleFilter', 'status', $event)">
          <option v-for="(status, idx) in statuses" :key="idx" :value="status[0]">
            {{status[1].title}}
          </option>
        </b-select>
      </b-field>
    </div>
    <div slot="right">
      <b-button
          :to="{ name: 'order.create' }"
          tag="router-link"
          target="_blank"
          type="is-primary"
          icon-right="plus-circle"/>
    </div>
  </card-toolbar>
</template>

<script>
import CardToolbar from '@/components/CardToolbar'

export default {
  name: 'ProductsToolbar',
  components: {
    CardToolbar
  },
  props: {
    statuses: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
