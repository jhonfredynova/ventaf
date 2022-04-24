import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Authorization from '../../components/authorization';
import SEO from '../../components/seo';
import NavigationBar from '../../components/navigation-bar';
import FormPost from '../../components/page-post-edition/form-post';
import { getPostById, updatePost } from '../../services/posts-service';
import { getFilesFromUrls } from '../../utils/upload-utils';

export const getServerSideProps = async ({ query }) => {
	const { postId } = query;
	const postData = await getPostById(postId);

	if (!postData) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			postData,
		},
	};
};

function EditPost(props) {
	const { postData } = props;
	const { authData } = useSelector((state) => state.auth);
	const router = useRouter();
	const [isPosting, setIsPosting] = useState(false);
	const [isPhotosLoaded, setIsPhotosLoaded] = useState(false);
	const [changePhotos, setChangePhotos] = useState(false);
	const [errors, setErrors] = useState(false);
	const [model, setModel] = useState(postData);
	const { callingCodes, currencies, translations } = useSelector((state) => state.config);
	const pageTitle = translations.adEditionTitle;
	const pageDescription = translations.adEditionDescription;

	useEffect(() => {
		if (!isPhotosLoaded && postData) {
			getFilesFromUrls(postData.photos).then((filesData) => {
				setModel({ ...model, photos: filesData });
				setIsPhotosLoaded(true);
			});
		}
	}, [isPhotosLoaded, model, postData]);

	const onSavePost = async (event) => {
		try {
			if (event) {
				event.preventDefault();
			}

			// parsing post data
			setIsPosting(true);
			const { photos, ...modelData } = model;
			const postInfo = {
				...modelData,
				seller: {
					...model.seller,
					email: authData && authData.email,
				},
				user: authData && authData.uid,
			};

			// updating post info
			const formData = new FormData();
			formData.append('data', JSON.stringify(postInfo));

			if (changePhotos) {
				photos.forEach((file) => formData.append('photos', file));
			}

			await updatePost(postInfo.id, formData);

			// redirecting to the user ads
			setIsPosting(false);
			router.push(`/${authData.profile.username}`);
		} catch (error) {
			const { errors: serverErrors, code, message } = error?.response?.data || {};
			setIsPosting(false);
			setErrors({
				...serverErrors,
				general: translations[code] || message,
			});
		}
	};

	return (
		<main>
			<SEO title={pageTitle} description={pageDescription} />
			<NavigationBar
				title={pageTitle}
				description={pageDescription}
				translations={translations}
				showBackBtn
			/>
			<FormPost
				isPosting={isPosting}
				btnLabel={translations.update}
				callingCodes={callingCodes}
				currencies={currencies}
				errors={errors}
				model={model}
				translations={translations}
				onChangePhotos={setChangePhotos}
				onChangeModel={setModel}
				onSavePost={onSavePost}
			/>
			<style jsx>{`
				main {
					max-width: var(--container-width);
					margin: 0 auto;
					padding: calc(var(--spacer) * 2);
				}
			`}</style>
		</main>
	);
}

export default Authorization(EditPost, ['registered']);
