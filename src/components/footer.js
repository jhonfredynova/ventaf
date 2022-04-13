import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Footer(props) {
	const { translations } = props;
	const router = useRouter();
	const { locale, pathname, query } = router;

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
				<li>
					<a
						href="mailto:construccionytecnologiasas@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						{translations.contact}
					</a>
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
						> li {
							padding: 4px;

							:global(a) {
								color: var(--color-links);
								text-decoration: none;
							}
						}
					}
				}
			`}</style>
		</footer>
	);
}
