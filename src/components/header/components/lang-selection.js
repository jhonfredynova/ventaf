import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function langSelection(props) {
	const { translations } = props;
	const router = useRouter();
	const { query, locale, pathname } = router;

	return (
		<button className="lang-selection">
			<i className="fas fa-solid fa-globe" />
			{locale.toString()}
			<ul className="suggestions">
				{locale !== 'en' && (
					<li>
						<Link href={{ pathname, query }} locale="en" passHref>
							<a className="link" href="passHref">
								{translations.english}
							</a>
						</Link>
					</li>
				)}
				{locale !== 'es' && (
					<li>
						<Link href={{ pathname, query }} locale="es" passHref>
							<a className="link" href="passHref">
								{translations.spanish}
							</a>
						</Link>
					</li>
				)}
			</ul>
			<style jsx>{`
				.lang-selection {
					position: relative;
					display: flex;
					align-items: center;
					background: none;
					border: 3px solid var(--color-links);
					border-radius: var(--spacer);
					cursor: pointer;
					color: var(--color-links);
					padding: var(--spacer);
					text-transform: uppercase;

					i.fas {
						margin-right: 4px;
					}

					.suggestions {
						display: none;
						position: absolute;
						background-color: var(--color-background);
						border: 1px solid var(--color-primary);
						top: 100%;
						left: 0;
						list-style: none;
						text-align: left;
						margin-top: 2px;
						padding: 0;
						z-index: 2;

						li > .link {
							display: block;
							color: var(--color-text);
							text-decoration: none;
							text-transform: capitalize;
							padding: var(--spacer);

							&:hover {
								background-color: var(--color-secondary);
							}
						}
					}

					&:focus,
					&:hover {
						.suggestions {
							display: block;
						}
					}
				}
			`}</style>
		</button>
	);
}
