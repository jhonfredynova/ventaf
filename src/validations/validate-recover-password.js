import { isEmail } from '../validation-utils';

export default modelData => {
  let errors = {};

  if (!modelData.password?.trim()) {
    errors.password = 'field-required';
  } else if (isEmail(modelData)) {
    errors.email = 'field-email-invalid';
  }

  return errors;
};