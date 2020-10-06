export function isNullOrUndefinedOrEmpty(value) {
  const isNullOrUndefined = value === null || value === undefined;
  const isEmpty = typeof value === "string" ? value === "" : false;
  return isNullOrUndefined || isEmpty;
}
