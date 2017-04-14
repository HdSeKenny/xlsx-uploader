import express from 'express';
import multiparty from 'multiparty';
import XLSX from 'xlsx';
import commonParser from './commonParser';

const router = express.Router();

router.post('/uploadCsv', (req, res) => {
  // create a form to begin parsing
  const form = new multiparty.Form();
  let collectionType;
  let refMetadata;
  let content;

  form.on('close', () => {
    console.log(content);
    res.send(content);
  });

  // listen on field event for collectionType
  form.on('field', (name, val) => {
    if (name === 'collectionType') {
      collectionType = val;
    }
    if (name === 'refMetadata') {
      refMetadata = JSON.parse(val);
    }
  });

  // listen on part event for excel file
  form.on('part', (part) => {
    if (!part.filename) return;
    const buffers = [];
    part.on('data', (buf) => {
      buffers.push(buf);
    });

    part.on('end', () => {
      const buffer = Buffer.concat(buffers);
      const workbook = XLSX.read(buffer);
      content = commonParser(workbook, collectionType, refMetadata);
    });
  });

  form.parse(req);
});

export default router;
