import Vue from "vue";

export const setAuthCookies = (user) => {
  if (user.token) {
    Vue.$cookies.set('token', user.token);
    if (!Vue.$cookies.isKey('user_type')) {
      const role = user.roles.includes('admin')
        ? 'admin' : user.roles.includes('writer')
        ? 'writer' : 'reader';
        Vue.$cookies.set('user_type', role);
      Vue.$cookies.set('user_id', user._id);
      Vue.$cookies.set('user_name', user.name);
    }
    return true;
  }
  return false;
};