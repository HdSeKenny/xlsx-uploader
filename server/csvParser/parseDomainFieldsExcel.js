import XLSX from 'xlsx';


module.exports = (workbook, schema, refMetadata, commonValidator) => {
  const result = {};
  const firstSheetName = workbook.SheetNames[0];
  if (firstSheetName !== 'DomainFields') {
    result.error = {
      message: "The first sheet should be 'DomainFields', please check excel file."
    };
    return result;
  }
  const domainValues = refMetadata.domain.map(item => parseInt(item._id.value, 10));
  const parseSheetDomainFields = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
  // result push to data
  const data = [];
  for (let i = 0; i < parseSheetDomainFields.length; i++) {
    const row = parseSheetDomainFields[i];
    // construct domainfield object
    const domainfield = {
      display_literal: row.display_literal,
      friendly_name: row.friendly_name,
      mouseover_literal: row.mouseover_literal,
      _id: {
        version: parseInt(row.version, 10),
        value: parseInt(row.value, 10)
      },
      domain_value: parseInt(row.domain_value, 10),
      dbcolumn: row.dbcolumn,
      category: row.category,
      active: Boolean(row.field_active),
      ru: parseInt(row.ru, 10)
    };
    domainfield.active = null;
    if (row.field_active && row.field_active.toLowerCase() === 'true') {
      domainfield.active = true;
    }
    if (row.field_active && row.field_active.toLowerCase() === 'false') {
      domainfield.active = false;
    }
    const dbvalues = [];
    const parseRecodes = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]]);
    parseRecodes.forEach((recode) => {
      const domainValue = parseInt(recode.domain_value, 10);
      const dbcolumn = recode.dbcolumn;
      if (domainValue === domainfield.domain_value && dbcolumn === domainfield.dbcolumn) {
        dbvalues.push({
          dbvalue: recode.dbvalue,
          display_literal: recode.display_literal,
          display_order: parseInt(recode.display_order, 10),
          active: Boolean(recode.code_active),
          sl: recode.sl
        });
      }
    });

    domainfield.dbvalues = dbvalues;

    // check reference for domainfield

    if (!domainValues.find(v => domainfield.domain_value === v)) {
      result.error = {
        message: `The Referenced Domain of row ${i + 2} does not exist.`
      };
      break;
    }

    // common validation, combining schema with domainfield
    const error = commonValidator(domainfield, i, 1, schema);
    if (error) {
      result.error = error;
      break;
    }

    data.push(domainfield);
  }
  result.data = data;

  return result;
};
