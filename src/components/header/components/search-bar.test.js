/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './search-bar';

test('Render component', async () => {
	const placeholder = 'Search';
	const translations = {
		clean: 'Clean',
		search: 'Search'
	};

	render(<SearchBar placeholder={placeholder} translations={translations} />);

	expect(screen.getByPlaceholderText(placeholder)).toBeDefined();
	expect(screen.getByTitle(translations.search)).toBeDefined();
});

test('On change handler', async () => {
	const placeholder = 'Search';
	const searchTerm = 'My keyword';
	const translations = {
		clean: 'Clean',
		search: 'Search'
	};
	const mockOnChangeHandler = jest.fn();

	render(
		<SearchBar
			placeholder={placeholder}
			searchTerm={searchTerm}
			translations={translations}
			onChange={mockOnChangeHandler}
		/>
	);

	const inputSearch = screen.getByPlaceholderText(placeholder);
	fireEvent.change(inputSearch, { target: { value: 'new search' } });

	const buttonClean = screen.getByTitle(translations.clean);
	fireEvent.click(buttonClean);

	expect(mockOnChangeHandler).toHaveBeenCalledTimes(1);
});

test('On submit handler', async () => {
	const placeholder = 'Search';
	const searchTerm = 'My keyword';
	const translations = {
		clean: 'Clean',
		search: 'Search'
	};
	const mockOnSubmitHandler = jest.fn();

	render(
		<SearchBar
			placeholder={placeholder}
			searchTerm={searchTerm}
			translations={translations}
			onSubmit={mockOnSubmitHandler}
		/>
	);

	const inputSearch = screen.getByPlaceholderText(placeholder);
	fireEvent.change(inputSearch, { target: { value: 'new search' } });

	const buttonSubmit = screen.getByTitle(translations.search);
	fireEvent.click(buttonSubmit);

	expect(mockOnSubmitHandler).toHaveBeenCalledTimes(1);
});
