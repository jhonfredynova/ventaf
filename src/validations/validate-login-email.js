import { isEmail } from '../utils/validation-utils';

export default modelData => {
  let errors = {};

  if (!modelData.email?.trim()) {
    errors.email = 'fieldRequired';
  } else if (!isEmail(modelData.email)) {
    errors.email = 'fieldInvalidEmail';
  }

  if (!modelData.password?.trim()) {
    errors.password = 'fieldRequired';
  }

  return errors;
};