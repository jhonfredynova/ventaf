const getDbParsedQuery = query => {
	const response = {};
	let searchCriteria = {};
	let searchCriteriaValue = '';

	Object.keys(query).forEach(key => {
		searchCriteria = query[key];

		if (key === 'limit') {
			response.limit = searchCriteria;
		}
		if (key === 'select') {
			response.select = searchCriteria;
		}
		if (key === 'sort') {
			response.sort = Object.keys(searchCriteria).map(searchKey => [
				searchKey,
				searchCriteria[searchKey]
			]);
		}
		if (key === 'where') {
			response.where = [];

			Object.keys(searchCriteria).forEach(searchKey => {
				Object.keys(searchCriteria[searchKey]).forEach(criteria => {
					searchCriteriaValue = searchCriteria[searchKey][criteria];

					switch (criteria) {
						case 'like':
							if (searchCriteriaValue) {
								response.where.push([
									searchKey,
									'>=',
									searchCriteriaValue
								]);
								// response.where.push([key, '<=', searchCriteriaValue]);
							}
							break;

						case 'range': {
							response.where.push([
								searchKey,
								'>=',
								searchCriteriaValue.start
							]);
							response.where.push([
								searchKey,
								'<=',
								searchCriteriaValue.end
							]);
							break;
						}

						default:
							response.where.push([
								searchKey,
								criteria,
								searchCriteriaValue
							]);
							break;
					}
				});
			});
		}
	});

	return response;
};

export const getDbDocument = async (db, collection, documentId) => {
	let response = null;

	if (!documentId) {
		return null;
	}

	response = db.collection(collection);
	response = await response.doc(documentId).get();
	response = response.data();

	if (response) {
		response = Object.assign(response, { id: documentId });
	}

	return response;
};

export const getDbQuery = async (db, collection, query) => {
	const parsedQuery = getDbParsedQuery(query);
	let dbQuery = db.collection(collection);
	let response = [];

	if (parsedQuery.where && parsedQuery.where.length) {
		parsedQuery.where.forEach(item => {
			dbQuery = dbQuery.where(item[0], item[1], item[2]);
		});
	}
	if (parsedQuery.sort && parsedQuery.sort.length) {
		parsedQuery.sort.forEach(item => {
			dbQuery = dbQuery.orderBy(item[0], item[1] || 'asc');
		});
	}
	if (parsedQuery.limit) {
		dbQuery = dbQuery.limit(parsedQuery.limit);
	}

	response = await dbQuery.get();
	response = response.docs.map(doc =>
		Object.assign(doc.data(), { id: doc.id })
	);

	if (parsedQuery.select) {
		response = response.map(item =>
			Object.keys(item).reduce(
				(accum, key) =>
					parsedQuery.select.includes(key)
						? Object.assign(accum, { [key]: item[key] })
						: accum,
				{}
			)
		);
	}

	return response;
};

export const getDbQueryByIds = async (db, collection, documentIds) => {
	let response = [];
	const documentPromises = documentIds
		.filter(id => id)
		.map(id =>
			db
				.collection(collection)
				.doc(id)
				.get()
		);

	response = await Promise.all(documentPromises);
	response = response
		.filter(doc => !doc.isEmpty)
		.map(doc => Object.assign(doc.data(), { id: doc.id }));

	return response;
};
