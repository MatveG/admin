import { ref } from '@vue/composition-api'

export default (props, context) => {
  const draggingRow = ref({});

  const dragdrop = (payload) => {
    payload.event.target.closest('tr').classList.remove('is-selected');
  };
  const dragstart = (payload) => {
    draggingRow.value = payload.row;
    payload.event.dataTransfer.effectAllowed = 'copy';
  };
  const dragover = (payload) => {
    payload.event.dataTransfer.dropEffect = 'copy';
    payload.event.target.closest('tr').classList.add('is-selected');
    payload.event.preventDefault();
  };
  const dragleave = (payload) => {
    payload.event.target.closest('tr').classList.remove('is-selected');
    payload.event.preventDefault();
  };

  return {
    draggingRow,
    dragdrop,
    dragstart,
    dragover,
    dragleave
  }
}
