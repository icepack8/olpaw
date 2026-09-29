const STORAGE_KEY = 'olpaw_cat_payloads';

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveCatPayload(payload) {
  if (!payload || !payload.dataHash) return;
  const all = readAll();
  all[payload.dataHash] = payload;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getCatPayload(dataHash) {
  const all = readAll();
  if (!dataHash) return all;
  return all[dataHash] || null;
}
