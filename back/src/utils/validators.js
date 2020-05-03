// Checks whether an email is valid or not
export const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};
export const validatePhone = (phone) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return regex.test(phone);
};
export const validateURL = (url) => {
  try {
    new URL(url);
  } catch (_) {
    return false;
  }
  return true;
};

export const rangeRule = (min, max) => {
  return (entry) => (entry.length >= min && entry.length <= max);
};

export const minLengthRule = min => {
  return (entry) => entry.length >= min;
};

export const maxLengthRule = max => {
  return (entry) => entry.length <= max;
};