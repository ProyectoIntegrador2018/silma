export function getErrorMessage(error, defaultMessage) {
  const messageContainer = error.response ? error.response.data : error;
  return messageContainer.message || defaultMessage;
}

/**
 * Check if the current user has the given permission. Currently only admin users have roles.
 * If user type is "writer" or "reader" his function will always return true
 * @param {string} permission
 * @returns {boolean}
 */
export function hasPermission(permission) {
  const userType = this.$cookies.get("user_type");
  const role = this.$cookies.get("role");
  if (userType === "admin") return role && role[permission];
  return true;
}
