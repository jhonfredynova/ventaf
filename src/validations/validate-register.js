import { isEmail } from '../utils/validation-utils';

export default modelData => {
	const errors = {};

	if (!modelData.email?.trim()) {
		errors.email = 'fieldRequired';
	} else if (!isEmail(modelData.email)) {
		errors.email = 'fieldInvalidEmail';
	}

	if (!modelData.password?.trim()) {
		errors.password = 'fieldRequired';
	} else if (modelData.password?.length < 6) {
		errors.password = 'fieldPasswordInsecure';
	}

	if (!modelData.username?.trim()) {
		errors.username = 'fieldRequired';
	}

	return errors;
};
