const { randomUUID } = require('node:crypto');

function createId() {
  return typeof randomUUID === 'function'
    ? randomUUID()
    : `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
}

module.exports = {
  createId,
};
