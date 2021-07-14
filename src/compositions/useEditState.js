import { ref, onMounted } from '@vue/composition-api'

export default () => {
  const isMounted = ref(false);
  const isLoading = ref(false);
  const isSaved = ref(true);

  onMounted(() => {
    isMounted.value = true;
  });

  const draftState = () => {
    isSaved.value = false;
  };

  const loadingState = () => {
    isSaved.value = false;
    isLoading.value = true;
  };

  const savedState = () => {
    isSaved.value = true;
    isLoading.value = false;
  };

  return {
    isMounted,
    isLoading,
    isSaved,
    draftState,
    loadingState,
    savedState
  }
}
