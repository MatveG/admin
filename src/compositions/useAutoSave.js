export default () => {
  let saveTimer = {};

  const initAutoSave = (handler) => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(handler, 2000);
  };

  const cancelAutoSave = () => {
    clearTimeout(saveTimer);
  };

  return {
    saveTimer,
    initAutoSave,
    cancelAutoSave
  }
}
