import path from 'path';

export default (app) => {

  // Insert routes below
  app.use('/api', require('./api').default);
  app.use('/csvParser', require('./csvParser').default);
  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
