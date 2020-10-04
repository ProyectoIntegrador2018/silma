export function getErrorMessage(error, defaultMessage) {
  const messageContainer = error.response ? error.response.data : error;
  return messageContainer.message || defaultMessage;
}
