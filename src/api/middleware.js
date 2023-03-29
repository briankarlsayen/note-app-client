import Swal from 'sweetalert2';

// Toast
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
});

export const toastAlert = (icon, message) => {
  Toast.fire({
    icon: icon,
    title: message,
    timer: 2000,
  });
};

export const toastAlertwithMessage = (icon, title, message) => {
  Toast.fire({
    icon: icon,
    title: title,
    text: message,
    timer: 1500,
  });
};

export const customToastAlert = (icon, message, timer) => {
  Toast.fire({
    icon: icon,
    title: message,
    timer: timer,
  });
};

export const confirmationModal = (action) => {
  let message = {
    title: '',
    icon: '',
    message: '',
    confirmButton: '',
    cancelButton: '',
  };

  if (action === 'status') {
    message.message = 'Do you want to change status?';
    message.confirmButton = 'Yes, Update';
    message.cancelButton = 'Cancel';
  }

  if (action === 'status') {
    message.title = 'Warning';
    message.icon = 'warning';
    message.message = 'Do you want to change status?';
    message.confirmButton = 'Yes, Update';
    message.cancelButton = 'Cancel';
  }

  if (action === 'update') {
    message.title = 'Warning';
    message.icon = 'warning';
    message.message = 'Do you want to update this?';
    message.confirmButton = 'Yes, Update';
    message.cancelButton = 'Cancel';
  }

  if (action === 'archive') {
    message.title = 'Archive';
    message.icon = 'error';
    message.message = 'Do you want to archive this?';
    message.confirmButton = 'Archive';
    message.cancelButton = 'Cancel';
  }

  return Swal.fire({
    icon: message.icon,
    title: message.title,
    width: 400,
    text: message.message,
    showCancelButton: true,
    confirmButtonText: message.confirmButton,
    denyButtonText: message.cancelButton,
  }).then(async (result) => {
    if (result.isConfirmed) {
      return true;
    } else if (result.isDenied) {
      return false;
    }
    return false;
  });
};

export const statusAlertModal = (icon, title, text, confirmButton) => {
  return Swal.fire({
    icon: icon,
    title: title,
    text: text,
    confirmButtonText: confirmButton,
  });
};
