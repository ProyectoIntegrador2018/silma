export const emailRule = (entry) =>
  !!entry.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ) || "E-mail inválido";

export const requiredRule = (entry) =>
  (entry !== undefined && entry !== null && entry !== "") ||
  "Campo obligatorio";

export const numericRule = (entry) =>
  /^\d+$/.test(entry) || "Solo se aceptan números";

export const facebookRule = (entry) =>
  /^((https:\/\/www\.)|(www\.))?(facebook\.com\/){1}(.)+/.test(entry) ||
  "Perfil de facebook inválido";

export const linkRule = (entry) =>
  //eslint-disable-next-line
  (entry !== undefined && !!entry.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) ||
  "Link invalido, ocupa tener http o https"

export const passwordMinRule = (entry) =>
  /.{8,}/.test(entry) || "Mínimo 8 caracteres";

export const phoneRule = (entry) =>
  /\d{10}/.test(entry) || "Ingresa los 10 dígitos de tu celular";

export const letterRule = (entry) =>
  /^[A-Za-záéíóúÁÉÍÓÚ\s]+$/.test(entry) || "Solo se aceptan letras";

export const phasesRule = (entry) =>
  /([1-4]){1}/.test(entry) || "Solo se aceptan fases del 1 al 4";
