const { createServer } = require('https');
const { parse } = require('url');
const fs = require('fs');
const next = require('next');
const nextConfig = require('./next.config'); 
const nextServer = next({ nextConfig });
const nextRequest = nextServer.getRequestHandler();
const nextPort = 3000;
const httpsOptions = {
  key: fs.readFileSync('./ssl/localhost-key.pem'),
  cert: fs.readFileSync('./ssl/localhost-cert.pem')
};

nextServer.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    nextRequest(req, res, parsedUrl);
  }).listen(nextPort, (err) => {
    if (err) throw err;
    console.warn(`Started server on url: https://localhost:${nextPort}`);
  });
});

