import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './components/logo';
import SearchBar from './components/search-bar';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function Header(props) {
	const { authData, authLoaded, translations } = props;
	const [isMobileDevice, setIsMobileDevice] = useState(false);
	const [showMobileSearch, setShowMobileSearch] = useState(false);
	const router = useRouter();
	const { query } = router;
	const photoUrl = (authLoaded && authData?.profile?.photoURL) || '/anonymous.png';

	const onClickPost = () => {
		ReactGA.event({
			category: 'Users',
			action: 'Clicked new post from header',
			value: 3,
		});
	};

	const onSearch = (searchTerm) => {
		const newQuery = { ...query };

		if (searchTerm.trim()) {
			newQuery.search = searchTerm;
		} else {
			delete newQuery.search;
		}

		router.push({ pathname: '/', query: newQuery });
	};

	const onSearchMobile = (searchTerm) => {
		onSearch(searchTerm);
		setShowMobileSearch(false);
	};

	const onResizeWindow = () => {
		setIsMobileDevice(window.innerWidth < parseInt(BREAKPOINTS.TABLET, 10));
	};

	useEffect(() => {
		window.addEventListener('resize', onResizeWindow);

		return () => {
			window.removeEventListener('resize', onResizeWindow);
		};
	}, []);

	return (
		<header>
			<nav className={`navbar ${isMobileDevice && showMobileSearch ? 'hide' : ''}`}>
				<div className="logo-wrapper">
					<Link href="/">
						<a href="passHref" className="link">
							<Logo translations={translations} />
						</a>
					</Link>
				</div>

				<div className="search-wrapper">
					{!isMobileDevice && (
						<>
							<label className="sr-only" htmlFor="searchTerms">
								{translations.search}:
							</label>
							<SearchBar
								id="searchTerms"
								placeholder={translations.homeSearchInputPlaceholder}
								searchTerm={query.search}
								translations={translations}
								onSubmit={onSearch}
							/>
						</>
					)}
				</div>

				<div className="menu-wrapper">
					{isMobileDevice && (
						<button
							type="button"
							className="btn-search-mobile"
							title={translations.search}
							onClick={() => setShowMobileSearch(true)}
						>
							<i className="fas fa-search" />
						</button>
					)}

					<Link href="/post">
						<a href="passHref" className="btn-post" onClick={onClickPost}>
							<i className="fas fa-plus" /> {translations.sell}
						</a>
					</Link>

					<Link href={authLoaded && authData ? `/${authData?.profile?.username}` : '/login'}>
						<a href="passHref" className="btn-profile" title={translations.profile}>
							{authLoaded && (
								<Image
									src={photoUrl.concat(`?${Date.now()}`)}
									alt={translations.profile}
									width={40}
									height={40}
								/>
							)}
							{!authLoaded && (
								<i className="fas fa-spinner fa-spin fa-2x" title={translations.loading} />
							)}
						</a>
					</Link>
				</div>
			</nav>

			{isMobileDevice && showMobileSearch && (
				<SearchBar
					autofocus
					placeholder={translations.homeSearchInputPlaceholder}
					searchTerm={query.search}
					translations={translations}
					onSubmit={onSearchMobile}
					onClose={() => setShowMobileSearch(false)}
				/>
			)}

			<style jsx>{`
				header {
					background: var(--color-background);
					box-shadow: var(--color-secondary) 0px 1px 2px 0px, var(--color-secondary) 0px 1px 4px 0px,
						var(--color-secondary) 0px 2px 8px 0px;
					padding: var(--spacer);

					.hide {
						display: none !important;
					}

					.navbar {
						display: grid;
						grid-template-columns: auto 1fr auto;
						gap: var(--spacer);
						align-items: center;
						margin: 0 auto;
						max-width: var(--container-width);

						.logo-wrapper {
							display: flex;
							flex-flow: column;
							align-items: center;
							margin-right: var(--spacer);
							width: 100%;

							:global(.link) {
								text-decoration: none;
							}
						}

						.search-wrapper {
							display: flex;
							align-items: center;
							justify-self: center;
							width: 100%;
							max-width: 600px;
						}

						.menu-wrapper {
							display: flex;
							align-items: center;

							.btn-search-mobile,
							.btn-post {
								display: flex;
								align-items: center;
								background: none;
								border: none;
								border: 3px solid var(--color-links);
								border-radius: var(--spacer);
								color: var(--color-links);
								cursor: pointer;
								padding: var(--spacer);
							}

							.btn-search-mobile {
								margin-right: 10px;
								height: 44px;
							}

							.btn-post {
								text-decoration: none;
								margin-left: var(--spacer);

								.fa-plus {
									margin-right: 5px;
								}
							}

							.btn-profile {
								color: var(--color-text);
								margin-left: 8px;
								text-decoration: none;
								flex-shrink: 0;

								i {
									pointer-events: none;
								}

								:global(img) {
									border-radius: 50%;
									height: 38px;
									width: 38px;
								}
							}
						}
					}
				}
			`}</style>
		</header>
	);
}
