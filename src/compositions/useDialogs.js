import { ToastProgrammatic as Toast, DialogProgrammatic as Dialog } from 'buefy'

export default function () {
  function fireToast (message, type = 'is-warning') {
    Toast.open({ message, type, queue: true });
  }

  function confirmDialog (handler, message, type, icon) {
    Dialog.confirm({
      onConfirm: () => handler(),
      message,
      icon,
      hasIcon: !!icon,
      ...(type ? { type } : {})
    })
  }

  return {
    fireToast,
    confirmDialog
  }
}
