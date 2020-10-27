import { events } from "../main";

export function snackbar(message) {
  events.$emit("snackbar", message);
}

export function globalLoading(globalLoading) {
  events.$emit("globalLoading", globalLoading);
}
