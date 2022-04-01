export default modelData => {
	const errors = {};

	if (!modelData.password?.trim()) {
		errors.password = 'field-required';
	} else if (modelData.password?.length < 6) {
		errors.password = 'field-password-insecure';
	}

	return errors;
};
