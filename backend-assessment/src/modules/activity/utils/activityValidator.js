const HttpError = require('../../../utils/httpError');

const ALLOWED_FIELDS = ['action', 'info'];

function validateCreateActivity(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new HttpError(400, 'Body must be a JSON object.');
  }

  const unknownFields = Object.keys(payload).filter(
    (field) => !ALLOWED_FIELDS.includes(field)
  );
  if (unknownFields.length > 0) {
    throw new HttpError(400, 'Body contains unsupported fields.', {
      unsupportedFields: unknownFields,
    });
  }

  if (typeof payload.action !== 'string' || !payload.action.trim()) {
    throw new HttpError(400, '"action" is required and must be a non-empty string.');
  }

  if (payload.info !== undefined && typeof payload.info !== 'string') {
    throw new HttpError(400, '"info" must be a string.');
  }

  return {
    action: payload.action.trim(),
    info: payload.info !== undefined ? payload.info : null,
  };
}

module.exports = { validateCreateActivity };