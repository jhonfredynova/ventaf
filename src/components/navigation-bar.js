import React from 'react';
import { useRouter } from 'next/router';

export default function NavigationBar(props) {
	const { title, description, showBackBtn, translations } = props;
	const router = useRouter();

	return (
		<section className="navigation-bar">
			{showBackBtn && (
				<div className="left-box">
					<button
						type="button"
						className="btn-back"
						title={translations.goBack}
						onClick={() => router.back()}
					>
						<i className="fas fa-arrow-left" />
					</button>
				</div>
			)}
			<div className="center-box">
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			<style jsx>{`
				.navigation-bar {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: calc(var(--spacer) * 4);

					.left-box {
						flex-grow: 0;
						text-align: left;

						.btn-back {
							background: none;
							border: none;
							color: var(--color-text);
							cursor: pointer;
							padding: var(--spacer);
						}
					}

					.center-box {
						flex-grow: 1;
						max-width: 100%;
						text-align: center;

						h1 {
							margin: 0;
							margin-bottom: var(--spacer);
						}

						p {
							margin: 0;
							margin-bottom: var(--spacer);
						}
					}
				}
			`}</style>
		</section>
	);
}
