'use strict';

import { Router } from 'express';
import multiparty from 'multiparty';
import util from 'util';

const router = new Router();

router.post('/uploadCsv', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {

      res.json(files).status(200);

  });
});

export default router;
