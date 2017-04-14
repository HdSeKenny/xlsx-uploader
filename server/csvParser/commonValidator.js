function _generalErrorMessage(column, errorType, CandidateValues) {
  const ERROR_MESSAGES = {
    // REQUIRED_ERROR: `The ${column} is required`,
    INTEGER_ERROR: CandidateValues ? `The ${column} is expected to be the one of ${CandidateValues}` : `The ${column} is expected to be an integer`,
    STRING_ERROR: CandidateValues ? `The ${column} is expected to be the one of ${CandidateValues}` : `The ${column} is expected to be an string`,
    OBJECT_ERROR: `The ${column} is expected to be a object`,
    ARRAY_ERROR: CandidateValues ? `The ${column} is expected to be an array and the items are belong to ${CandidateValues}` :
     `The ${column} is expected to be an array`,
    BOOLEAN_ERROR: `The ${column} is expected a boolean`
  };
  return ERROR_MESSAGES[errorType];
}



module.exports = (metadata, rowNum, sheetNum, schema) => {
  let errorMessage = '';
  const required = schema.required;
  const metadataKeys = Object.keys(metadata);
  // validate required properties
  for (let i = 0; i < required.length; i++) {
    const item = required[i];
    if (metadataKeys.includes(item)) {
      const keyValue = metadata[item];
      const keyType = schema.properties[item].type;
      const enums = schema.properties[item].enum;

      if (keyType === 'integer') {
        if (!Number.isInteger(keyValue)) {
          errorMessage = _generalErrorMessage(item, 'INTEGER_ERROR');
        }
        else if (Number.isInteger(keyValue) && enums && !enums.includes(keyValue)) {
          errorMessage = _generalErrorMessage(item, 'INTEGER_ERROR', enums);
        }
      }
      else if (keyType === 'string') {
        if (typeof keyValue !== 'string') {
          errorMessage = _generalErrorMessage(item, 'STRING_ERROR');
        }
        else if (typeof keyValue === 'string' && enums && !enums.includes(keyValue)) {
          errorMessage = _generalErrorMessage(item, 'STRING_ERROR', enums);
        }
      }
      else if (keyType === 'object' && (typeof keyValue) !== 'object') {
        errorMessage = _generalErrorMessage(item, 'OBJECT_ERROR');
      }
      else if (keyType === 'array') {
        if (toString.call(keyValue) !== '[object Array]') {
          errorMessage = _generalErrorMessage(item, 'ARRAY_ERROR');
        }
        else if (toString.call(keyValue) === '[object Array]' && enums && keyValue.some(v => !enums.includes(v))) {
          errorMessage = _generalErrorMessage(item, 'ENUM_ERROR', enums);
        }
      }
      else if (keyType === 'boolean' && (typeof keyValue !== 'boolean')) {
        errorMessage = _generalErrorMessage(item, 'BOOLEAN_ERROR');
      }
    }
    if (errorMessage) {
      break;
    }
  }
  // if there is error, return error message
  if (errorMessage) {
    return {
      message: `${errorMessage} in row ${rowNum + 2} in sheet ${sheetNum}`,
      metadata
    };
  }
};
