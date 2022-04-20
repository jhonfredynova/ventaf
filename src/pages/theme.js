import React from 'react';

export default function Theme() {
	return (
		<main>
			<h1>Theme</h1>

			<section className="section">
				<h2>Buttons</h2>

				<div className="elements">
					<button type="button" className="btn">
						Normal
					</button>
					<button type="button" className="btn primary">
						Primary
					</button>
					<button type="button" className="btn secondary">
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
					<input type="text" className="input" value="Normal" />
					<input type="email" className="input" value="Email" />
					<input type="search" className="input" value="Search" />
					<input type="password" className="input" value="Password" />
				</div>
			</section>

			<section className="section">
				<h2>Links</h2>

				<div className="elements">
					<a className="link" href="https://google.com" target="_blank" rel="noreferrer">
						Normal
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
