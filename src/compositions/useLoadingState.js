import { ref, onMounted } from '@vue/composition-api'

export default () => {
  const mounted = ref(false);
  const isLoading = ref(false);

  onMounted(() => {
    mounted.value = true;
  });

  const loadingState = () => {
    isLoading.value = true;
  };

  const readyState = () => {
    isLoading.value = false;
  };

  return {
    isLoading,
    loadingState,
    readyState
  }
}
