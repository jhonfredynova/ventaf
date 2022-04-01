/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from './logo';

test('Render component', async () => {
	const translations = { slogan: 'Welcome' };

	render(<Logo translations={translations} />);

	expect(screen.getByAltText(translations.slogan)).toBeDefined();
	expect(screen.getByText('Construccion')).toBeDefined();
});
