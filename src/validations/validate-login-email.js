import { isEmail } from '../utils/validation-utils';

export default modelData => {
  let errors = {};

  if (!modelData.email?.trim()) {
    errors.email = 'field-required';
  } else if (!isEmail(modelData.email)) {
    errors.email = 'field-email-invalid';
  }

  if (!modelData.password?.trim()) {
    errors.password = 'field-required';
  }

  return errors;
};