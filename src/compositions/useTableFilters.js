import { ref } from '@vue/composition-api'

export default (props, context) => {
  const table = ref(null);
  const filters = ref({});

  function toggleFilter (name) {
    filters.value[name] = !filters.value[name];
    context.root.$set(table.value.filters, name, table.value.filters[name] ? null : 'true')
  }

  return {
    table,
    filters,
    toggleFilter
  }
}
