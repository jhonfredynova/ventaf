import { isEmail } from '../validation-utils';

export default modelData => {
  let errors = {};

  if (modelData.email?.trim()) {
    errors.email = 'field-is-required';
  } else if (isEmail(modelData.email)) {
    errors.email = 'field-email-invalid';
  }

  if (modelData.password?.trim()) {
    errors.password = 'field-is-required';
  } else if (modelData.password?.length < 6) {
    errors.password = 'field-password-invalid';
  }

  return errors;
};