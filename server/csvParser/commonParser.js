import schema from '../../metadata/schema';
import parseDomainFieldsExcel from './parseDomainFieldsExcel';
import commonValidator from './commonValidator';



module.exports = (workbook, collectionType, refMetadata) => {
  if (collectionType === 'DomainFields') {
    return parseDomainFieldsExcel(workbook, schema[collectionType], refMetadata, commonValidator);
  }
};
