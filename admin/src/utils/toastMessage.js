export const toastMessage = (message, type = 'info', duration = 3000) => {
  const event = new CustomEvent('toast', {
    detail: { message, type, duration }
  });
  window.dispatchEvent(event);
};

export const showSuccess = (message) => toastMessage(message, 'success');
export const showError = (message) => toastMessage(message, 'error');
export const showWarning = (message) => toastMessage(message, 'warning');
export const showInfo = (message) => toastMessage(message, 'info');
