import { ref } from '@vue/composition-api'

export default (props, context) => {
  const table = ref(null);
  const filters = ref({});

  function toggleFilter (name, value = null) {
    if (value) {
      context.root.$set(table.value.filters, name, value)
    } else {
      filters.value[name] = !filters.value[name];
      context.root.$set(table.value.filters, name, table.value.filters[name] ? null : value || 'true')
    }
  }

  function resetFilters () {
    table.value.filters = {};
  }

  return {
    table,
    filters,
    toggleFilter,
    resetFilters
  }
}
