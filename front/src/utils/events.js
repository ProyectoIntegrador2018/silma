import { events } from "../main";

export function snackbar(message) {
  events.$emit("snackbar", message);
}
