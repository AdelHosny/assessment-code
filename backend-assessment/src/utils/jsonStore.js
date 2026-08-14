const fs = require('node:fs/promises');

async function readJsonArray(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    if (!raw.trim()) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, '[]\n', 'utf-8');
      return [];
    }

    throw error;
  }
}

async function writeJsonArray(filePath, data) {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

// One pending-operation chain per file path.
const fileLocks = new Map();

/**
 * Runs read -> mutate -> write as a single atomic unit per file.
 * `mutator(currentArray)` returns { result, next } where `next` is the
 * array to persist and `result` is whatever the caller wants back.
 * Concurrent calls for the SAME filePath are queued, never overlapped.
 */
async function updateJsonArray(filePath, mutator) {
  const previous = fileLocks.get(filePath) || Promise.resolve();

  const current = previous
    .catch(() => {}) // don't let one failed op jam the queue forever
    .then(async () => {
      const list = await readJsonArray(filePath);
      const { result, next } = await mutator(list);
      await writeJsonArray(filePath, next);
      return result;
    });

  fileLocks.set(filePath, current);
  return current;
}

module.exports = {
  readJsonArray,
  writeJsonArray,
  updateJsonArray,
};