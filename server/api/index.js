'use strict';

import { Router } from 'express';
import multiparty from 'multiparty';
import util from 'util';

const router = new Router();

router.post('/uploadCsv', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    console.log(fields, JSON.stringify(files, null, 2));
    console.log(util.inspect({fields: fields, files: files}));
  });
});

export default router;
