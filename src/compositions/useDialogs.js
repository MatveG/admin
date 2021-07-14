import { ToastProgrammatic as Toast, DialogProgrammatic as Dialog } from 'buefy'

export default () => {
  function validationError () {
    Toast.open({
      message: 'Заполните обязательные поля',
      type: 'is-warning',
      queue: true
    });
  }

  function confirmDelete (deleteHandler) {
    Dialog.confirm({
      hasIcon: true,
      type: 'is-danger',
      icon: 'delete',
      message: 'Удалить?',
      onConfirm: () => deleteHandler()
    })
  }

  return {
    validationError,
    confirmDelete
  }
}
