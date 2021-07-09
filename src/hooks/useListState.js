import { ref, onMounted } from '@vue/composition-api'

export default () => {
  const mounted = ref(false);
  const loading = ref(false);

  onMounted(() => {
    mounted.value = true;
  });

  const loadingState = () => {
    loading.value = true;
  };

  const readyState = () => {
    loading.value = false;
  };

  return {
    loading,
    loadingState,
    readyState
  }
}
