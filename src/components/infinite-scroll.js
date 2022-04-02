import React, { useEffect } from 'react';
import Preloader from './preloader';

export default function InfiniteScroll(props) {
	const { isLoading, hasMoreData, children, onLoadMore } = props;

	useEffect(() => {
		const onTrackScrolling = () => {
			if (isLoading || !hasMoreData) {
				return;
			}

			const { scrollHeight, scrollTop, clientHeight } =
				document.documentElement;

			if (scrollTop + clientHeight > scrollHeight - 5) {
				onLoadMore();
			}
		};
		window.addEventListener('scroll', onTrackScrolling);

		return () => {
			window.removeEventListener('scroll', onTrackScrolling);
		};
	});

	return (
		<>
			{children}
			{isLoading && (
				<div className="loading-more">
					<Preloader />
				</div>
			)}
			<style jsx>{`
				.loading-more {
					display: block;
					text-align: center;
					width: 100%;
				}
			`}</style>
		</>
	);
}
