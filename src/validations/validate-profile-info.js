import { isUrl } from '../utils/validation-utils';

export default modelData => {
  const errors = {};

  if (!modelData.username?.trim()) {
    errors.username = 'fieldRequired';
  }

  if (!modelData?.phone?.prefix?.trim()) {
    errors.phone = {
      ...errors.phone,
      prefix: 'selectPhonePrefix'
    };
  }

  if (!modelData?.phone?.number?.trim()) {
    errors.phone = {
      ...errors.phone,
      number: 'enterPhoneNumber'
    };
  }

  if (modelData.website && !isUrl(modelData.website)) {
    errors.website = 'fieldInvalidUrl';
  }

  return errors;
};