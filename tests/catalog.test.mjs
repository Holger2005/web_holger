import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCommission, matchesProject, validateProjects } from '../src/domain/projects.mjs';
import { makeCatalog } from '../src/application/catalog.mjs';
import { loadData } from '../src/infrastructure/files.mjs';
import { archive, home, casePage } from '../src/presentation/pages.mjs';

test('la comisión empieza en la sexta venta', () => {
  for (const sales of [0, 4, 5]) assert.deepEqual(calculateCommission(500, sales, 100), { commission: 0, total: 500 });
  assert.deepEqual(calculateCommission(500, 6, 100), { commission: 10, total: 510 });
  assert.deepEqual(calculateCommission(500, 8, 100), { commission: 30, total: 530 });
});
test('redondea centavos y rechaza ventas fraccionarias o negativas', () => {
  assert.deepEqual(calculateCommission(50.01, 6, 0.15), { commission: 0.02, total: 50.03 });
  for (const value of [-1, NaN, Infinity, 6.3]) assert.throws(() => calculateCommission(0, value, 5), RangeError);
});
test('la búsqueda admite tildes, mayúsculas y categoría', () => {
  assert.ok(matchesProject('Vinculación con IA', 'Automatización', ' VINCULACION ', 'Automatización'));
  assert.equal(matchesProject('Patitas', 'Backend', 'Patitas', 'Frontend'), false);
});
test('valida duplicados, fichas sin proyecto y repositorios ajenos', () => {
  const p = { id:'ejemplo', title:'Ejemplo', summary:'Descripción', category:'Web' };
  assert.throws(() => validateProjects([p, p], {}));
  assert.throws(() => validateProjects([p], {falta:{}}));
  assert.throws(() => validateProjects([{...p, url:'https://example.com/'}], {}));
});
test('el contenido HTML incluye el índice, las fichas y las imágenes antes de ejecutar JavaScript', async () => {
  const { projects, cases } = await loadData();
  const catalog = makeCatalog(projects, cases);
  assert.equal((archive(catalog).match(/class="repo"/g) || []).length, projects.length);
  assert.match(home(catalog), /<video controls/);
  for (const item of catalog.cases) {
    assert.ok(archive(catalog).includes(item.path));
    assert.ok(casePage(item).includes(item.image));
  }
});
