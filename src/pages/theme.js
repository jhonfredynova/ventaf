import React, { useState } from 'react';

export default function Theme() {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	return (
		<main className={isDarkTheme ? 'dark' : ''}>
			<h1>Theme</h1>

			<button type="button" className="btn btn-secondary" onClick={() => setIsDarkTheme(!isDarkTheme)}>
				{isDarkTheme ? <i className="fas fa-solid fa-moon" /> : <i className="fas fa-solid fa-sun" />}{' '}
				Toggle Dark Theme
			</button>

			<section className="section">
				<h2>Buttons</h2>

				<div className="elements">
					<button type="button" className="btn">
						Basic
					</button>
					<button type="button" className="btn btn-primary">
						Primary
					</button>
					<button type="button" className="btn btn-secondary">
						Secondary
					</button>
					<button type="button" className="btn btn-alert">
						Secondary
					</button>
					<button type="button" className="btn" disabled>
						Disabled
					</button>
				</div>
			</section>

			<section className="section">
				<h2>Forms</h2>

				<div className="elements">
					<input type="text" className="input" placeholder="Normal" />
					<input type="email" className="input" placeholder="Email" />
					<input type="search" className="input" placeholder="Search" />
					<input type="password" className="input" placeholder="Password" />
				</div>

				<div className="elements">
					<textarea className="input" placeholder="Long text" />
				</div>

				<div className="elements">
					<input id="checkbox-input" type="checkbox" />
					<input id="radio-input" type="radio" />
				</div>
			</section>

			<section className="section">
				<h2>Links</h2>

				<div className="elements">
					<a className="link" href="https://google.com" target="_blank" rel="noreferrer">
						Normal
					</a>
					<a className="link" href="https://google.com" target="_blank" rel="noreferrer">
						Visited
					</a>
				</div>
			</section>

			<style jsx>{`
				main {
					--container-width: 600px;
					max-width: var(--container-width);
					margin: 0 auto;
					padding: calc(var(--spacer) * 2);

					h1 {
						margin: 0;
						margin-bottom: var(--spacer);
					}

					.section {
						background-color: var(--color-background);
						color: var(--color-text);
						border: 1px solid var(--color-border);
						border-radius: var(--spacer);

						margin: calc(var(--spacer) * 2) 0;
						padding: var(--spacer);

						h2 {
							margin: 0;
							margin-bottom: var(--spacer);
						}

						.elements {
							display: flex;
							align-items: center;
							margin: var(--spacer);
							flex-wrap: wrap;

							> * {
								margin-right: var(--spacer);
								margin-bottom: var(--spacer);
							}
						}
					}
				}
			`}</style>
		</main>
	);
}
