const formatMessage = (message = "", ...args) =>
  message.replace(/{(\d+)}/g, (subStr, [index]) => args[index]);

const Messages = {
  RequiredField: () => "Campo Requerido.",
  IncompleteForm: () => "Favor de llenar todos los valores requeridos.",
  SomethingWentWrong: () => "Algo salió mal.",
  CRUDOperationSuccess: (operation) =>
    formatMessage("Registro {0} con éxito.", operation),
  Unauthorized: () => "No Autorizado."
};

export default Messages;
