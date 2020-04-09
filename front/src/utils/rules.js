
export const emailRule = v =>
  !!v.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ) || 'correo inválido';

export const requiredRule = v =>
  (v !== undefined && v !== null && v !== '') || 'Campo obligatorio';

export const numericRule = v => /^\d+$/.test(v) || 'Solo se aceptan números';