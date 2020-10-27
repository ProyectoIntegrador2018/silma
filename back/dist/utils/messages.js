"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var formatMessage = function formatMessage() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return message.replace(/{(\d+)}/g, (subStr, _ref) => {
    var [index] = _ref;
    return args[index];
  });
};

var Messages = {
  RequiredField: () => "Campo Requerido.",
  IncompleteForm: () => "Favor de llenar todos los valores requeridos.",
  SomethingWentWrong: () => "Algo salió mal.",
  CRUDOperationSuccess: operation => formatMessage("Registro {0} con éxito.", operation),
  NotFound: () => "Ruta no encontrada",
  DuplicatedValue: value => formatMessage("El campo {0} esta repetido.", value),
  Unauthorized: () => "El usuario no esta autorizado para realizar esta acción.",
  RoleAssignedToAdmin: () => "El rol ya esta asignado a algún Admin, no se puede eliminar."
};
var _default = Messages;
exports.default = _default;