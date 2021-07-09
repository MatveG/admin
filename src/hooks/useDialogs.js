import { DialogProgrammatic as Dialog } from 'buefy'

export default () => {
  const confirmDelete = (deleteHandler) => {
    Dialog.confirm({
      hasIcon: true,
      type: 'is-danger',
      icon: 'delete',
      message: 'Удалить?',
      onConfirm: () => deleteHandler()
    })
  };

  return {
    confirmDelete
  }
}
