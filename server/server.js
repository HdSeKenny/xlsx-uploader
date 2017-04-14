import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

server.listen(9000, ()=> {
  console.log(' ==> Server is running at localhost:9000');
});

require('./express').default(app);
require('./routes').default(app);