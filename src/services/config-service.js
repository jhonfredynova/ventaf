import callingCodes from '../assets/calling-codes.json';
import countries from '../assets/countries.json';
import currencies from '../assets/currencies.json';
import languages from '../assets/languages.json';
import translations from '../assets/translations.json';

// eslint-disable-next-line import/prefer-default-export
export const getConfig = (locale) => {
	const configData = {
		callingCodes,
		currencies,
		countries,
		languages,
		translations: translations[locale],
	};

	return configData;
};
