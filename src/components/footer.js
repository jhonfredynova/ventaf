import React from 'react';
import Link from 'next/link';

export default function Footer(props) {
	const { translations } = props;

	return (
		<footer className="footer">
			<ul>
				<li>
					<Link href="/faq" passHref>
						<a href="passHref">{translations.faq}</a>
					</Link>
				</li>
				<li>
					<Link href="/privacy" passHref>
						<a href="passHref">{translations.privacy}</a>
					</Link>
				</li>
				<li>
					<Link href="/terms" passHref>
						<a href="passHref">{translations.terms}</a>
					</Link>
				</li>
			</ul>

			<style jsx>{`
				.footer {
					border-top: 1px solid var(--color-border);
					padding: calc(var(--spacer) * 2);
					text-align: center;

					ul {
						list-style: none;
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 0;
						padding: 0;
						> li {
							padding: 0 4px;
						}
					}
				}
			`}</style>
		</footer>
	);
}
