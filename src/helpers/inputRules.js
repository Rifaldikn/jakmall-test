const required = (v, msg = "This input is required") => !!v || msg;

const objectRequired = (v, msg = "This input is required") =>
  Object.keys(v).length > 0 || msg;

const minValue = (v, l, msg = `Min. value ${l}`) => v >= l || msg;

const maxValue = (v, l, msg = `Max. value ${l}`) => v <= l || msg;

const minLength = (v, l, msg = `Min. ${l} character`) =>
  (v && v.length >= l) || msg;

const maxLength = (v, l, msg = `Max. ${l} character`) =>
  (v && v.length < l) || msg;

const email = (v, msg = "E-mail should be valid") => /.+@.+\..+/.test(v) || msg;

const samePass = (v1, v2, msg = "Password not match") => v1 === v2 || msg;

export {
  required,
  objectRequired,
  minValue,
  maxValue,
  minLength,
  maxLength,
  email,
  samePass,
};
