import { getDbQuery } from './database-utils';
import { deleteFromStorage } from './storage-utils';
import { formatTag, toSearchTerms } from './text-utils';

const createPostTag = async (db, tagName) => {
  let tagData = {
    createdAt: Date.now(),
    name: formatTag(tagName),
    views: 0
  };
  const postTags = await getDbQuery(db, 'posts-tags', { where: { name: { '==': tagData.name } } });
  const tagExist = postTags[0];

  if (!tagExist) {
    let responseNewTag = await db.collection('posts-tags').add(tagData);
    tagData = { ...tagData, id: responseNewTag.id };
  } else {
    tagData = tagExist;
  }

  return tagData;
};

export const getSearchTerms = postData => {
  const { description, location, seller } = postData;
  let searchTerms = [];

  // building search terms based on relevant information
  searchTerms = searchTerms.concat(toSearchTerms(description));
  searchTerms = searchTerms.concat(toSearchTerms(location && location.description));
  searchTerms = searchTerms.concat(toSearchTerms(seller && seller.email));

  // clean duplicated search terms
  searchTerms = searchTerms.filter((searchTerm, index, array) => array.indexOf(searchTerm) === index);
  searchTerms = searchTerms.filter(searchTerm => searchTerm.length > 2);

  return searchTerms;
};

export const deletePostImages = async photosToDelete => {
  if (photosToDelete.length === 0) {
    return;
  }

  const dataToDelete = {
    bucketName: process.env.FIREBASE_STG_POST_UPLOADS,
    fileUrls: photosToDelete
  };

  await deleteFromStorage(dataToDelete);
};

export const updateTagViews = async (db, tagName) => {
  const tagNameFormatted = formatTag(tagName);
  const postTags = await getDbQuery(db, 'posts-tags', { where: { name: { '==': tagNameFormatted } } });
  let tagData = postTags[0];

  if (!tagData) {
    tagData = createPostTag(db, tagNameFormatted);
  }

  await db
    .collection('posts-tags')
    .doc(tagData.id)
    .update({
      views: ((tagData.views || 0) + 1),
      updatedAt: Date.now()
    });

  return tagData;
};