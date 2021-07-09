import { ref, onMounted } from '@vue/composition-api'

export default () => {
  const mounted = ref(false);
  const loading = ref(false);
  const saved = ref(true);
  const timers = {};

  onMounted(() => {
    mounted.value = true;
  });

  const resetSaveTimer = (timeoutHandler) => {
    clearTimeout(timers.save);
    timers.save = setTimeout(timeoutHandler, 2000);
  };

  const draftState = () => {
    clearTimeout(timers.save);
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
    resetSaveTimer,
    draftState,
    loadingState,
    savedState
  }
}
