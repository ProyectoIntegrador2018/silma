const formatMessage = (message = "", ...args) =>
  message.replace(/{(\d+)}/g, (subStr, [index]) => args[index]);

const Messages = {
  RequiredField: () => "Campo Requerido.",
  IncompleteForm: () => "Favor de llenar todos los valores requeridos.",
  SomethingWentWrong: () => "Algo salió mal.",
  CRUDOperationSuccess: (operation) =>
    formatMessage("Registro {0} con éxito.", operation),
  NotFound: () => "Ruta no encontrada",
  DuplicatedValue: (value) =>
    formatMessage("El campo {0} esta repetido.", value),
  Unauthorized: () => "El usuario no esta autorizado para realizar esta acción."
};

export default Messages;
