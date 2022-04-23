import callingCodes from '../assets/calling-codes.json';
import countries from '../assets/countries.json';
import currencies from '../assets/currencies.json';
import languages from '../assets/languages.json';
import translations from '../assets/translations.json';

export const getCallingCodes = () => callingCodes;

export const getCountries = () => countries;

export const getCurrencies = () => currencies;

export const getLanguages = () => languages;

export const getTranslations = (locale) => translations[locale];
