const { https } = require('firebase-functions');
const next = require('next');
const nextConfig = require('./next.config');

const nextServer = next({ nextConfig });
const nextRequest = nextServer.getRequestHandler();

exports.app = https.onRequest(async (req, res) => {
	await nextServer.prepare();
	nextRequest(req, res);
});
