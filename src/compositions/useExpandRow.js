import { ref } from '@vue/composition-api';

export default () => {
  const expanded = ref([]);

  const isExpanded = (id) => {
    return expanded.value.includes(id);
  };

  const expandRow = (id) => {
    if (expanded.value.includes(id)) {
      expanded.value = expanded.value.filter((el) => el !== id);
    } else {
      expanded.value.push(id);
    }
  };

  return {
    expanded,
    expandRow,
    isExpanded
  };
};
