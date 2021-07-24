import { ref } from '@vue/composition-api';

export default function useDraggingRows () {
  const draggingRow = ref({});

  function dragdrop (payload) {
    payload.event.target.closest('tr').classList.remove('is-selected');
  }

  function dragstart (payload) {
    draggingRow.value = payload.row;
    payload.event.dataTransfer.effectAllowed = 'copy';
  }

  function dragover (payload) {
    payload.event.dataTransfer.dropEffect = 'copy';
    payload.event.target.closest('tr').classList.add('is-selected');
    payload.event.preventDefault();
  }

  function dragleave (payload) {
    payload.event.target.closest('tr').classList.remove('is-selected');
    payload.event.preventDefault();
  }

  return {
    draggingRow,
    dragdrop,
    dragstart,
    dragover,
    dragleave
  };
}
