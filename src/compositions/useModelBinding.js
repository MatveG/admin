import { computed } from '@vue/composition-api';

export default (props, context) => {
  const model = computed({
    get: () => props.value,
    set: (value) => context.emit('input', value)
  });

  return {
    model
  };
};
