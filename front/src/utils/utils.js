export function getErrorMessage(error, defaultMessage) {
  const messageContainer = error.response ? error.response.data : error;
  return messageContainer.message || defaultMessage;
}

export function hasPermission(permission) {
  const userType = this.$cookies.get("user_type");
  const admin = this.$cookies.get("admin");
  if (userType === "admin")
    return admin && admin.role && admin.role[permission];
  return true;
}
