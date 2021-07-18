export default () => {
  let saveTimer = {};

  function initAutoSave (handler) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(handler, 2000);
  }

  function cancelAutoSave () {
    clearTimeout(saveTimer);
  }

  return {
    saveTimer,
    initAutoSave,
    cancelAutoSave
  }
}
