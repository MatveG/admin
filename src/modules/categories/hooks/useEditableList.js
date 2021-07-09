import { ref } from '@vue/composition-api'

export default () => {
  const creating = ref(false);
  const item = ref({ id: null });

  const isEdited = (row) => row.id === item.value.id || row === item.value;

  const reset = () => {
    // this.$v.$reset();
    creating.value = false;
    item.value = {};
  };

  return {
    creating,
    item,
    isEdited,
    reset
  }
}
