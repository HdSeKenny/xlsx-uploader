'use strict';

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import path from 'path';

export default (app) => {

  app.set('appPath', path.join(path.normalize(`${__dirname}/..`), 'client'));
  app.use(express.static(app.get('appPath')));
  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(errorHandler()); // Error handler - has to be last
};