const fs = require('node:fs');
const path = require('node:path');

const fp = path.join(process.cwd(), 'data', 'activity.json');

function loadDataA() {
  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, '[]');
  }

  let raw = fs.readFileSync(fp, 'utf8');
  if (!raw) {
    raw = '[]';
  }

  return JSON.parse(raw);
}

function loadDataB() {
  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, '[]');
  }

  let raw = fs.readFileSync(fp, 'utf8');
  if (!raw) {
    raw = '[]';
  }

  return JSON.parse(raw);
}

function getAllActivity() {
  const arr = loadDataA();
  return arr;
}

function createNewActivity(b) {
  const list = loadDataB();
  const one = {
    id: String(Date.now()),
    action: b.action,
    info: b.info,
    when: new Date().toISOString(),
  };

  list.push(one);
  fs.writeFileSync(fp, JSON.stringify(list, null, 2));
  return one;
}

module.exports = {
  getAllActivity,
  createNewActivity,
};
