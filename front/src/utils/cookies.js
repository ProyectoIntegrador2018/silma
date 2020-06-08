import Vue from "vue";

// Funcion que guarda en las cookies el token, rol, id y nombre del usuario
export const setAuthCookies = (user) => {
  if (user.token) {
    Vue.$cookies.set("token", user.token);
    if (!Vue.$cookies.isKey("user_type")) {
      const role = user.roles.includes("admin")
        ? "admin"
        : user.roles.includes("writer")
        ? "writer"
        : "reader";
      Vue.$cookies.set("user_type", role);
      Vue.$cookies.set("user_id", user._id);
      Vue.$cookies.set("user_name", user.name);
    }
    return true;
  }
  return false;
};

// Funcion que remueve las cookies de token, rol, id y nombre del usuario
export const cleanAuthCookies = () => {
  Vue.$cookies.remove("token");
  Vue.$cookies.remove("user_type");
  Vue.$cookies.remove("user_id");
  Vue.$cookies.remove("user_name");
};
