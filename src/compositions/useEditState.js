import { ref, onMounted } from '@vue/composition-api'

export default () => {
  const mounted = ref(false);
  const loading = ref(false);
  const saved = ref(true);

  onMounted(() => {
    mounted.value = true;
  });

  const draftState = () => {
    saved.value = false;
  };

  const loadingState = () => {
    saved.value = false;
    loading.value = true;
  };

  const savedState = () => {
    saved.value = true;
    loading.value = false;
  };

  return {
    loading,
    saved,
    draftState,
    loadingState,
    savedState
  }
}
