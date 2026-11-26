export function validateProjects(projects, cases) {
  const ids = new Set();
  for (const project of projects) {
    const { id, title, summary, category, url } = project;
    if (!id || !/^[a-zA-Z0-9_-]+$/.test(id) || ids.has(id) || !title || !summary || !category) {
      throw new Error('Proyecto incompleto o identificador repetido: ' + id);
    }
    if (url && !url.startsWith('https://github.com/Holger2005/')) throw new Error('Origen de repositorio inesperado: ' + id);
    ids.add(id);
  }
  for (const id of Object.keys(cases)) {
    if (!ids.has(id)) throw new Error('Ficha sin proyecto: ' + id);
  }
}
export function normalize(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
export function matchesProject(text, category, query, selectedCategory) {
  return (!selectedCategory || category === selectedCategory) && normalize(text).includes(normalize(query));
}
export function calculateCommission(base, sales, price) {
  if (![base, sales, price].every(Number.isFinite) || !Number.isSafeInteger(sales) || Math.min(base, sales, price) < 0) {
    throw new RangeError('Ingresa valores válidos y un número entero de ventas.');
  }
  const commission = Math.round((Math.max(0, sales - 5) * price * 0.1 + Number.EPSILON) * 100) / 100;
  return { commission, total: Math.round((base + commission + Number.EPSILON) * 100) / 100 };
}
