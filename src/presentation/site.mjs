import { calculateCommission, matchesProject } from './projects.mjs';

const filters = document.querySelector('.filters');
if (filters) {
  filters.hidden = false;
  const search = document.querySelector('#search');
  const category = document.querySelector('#category');
  const cards = [...document.querySelectorAll('.repo')];
  function filter() {
    let count = 0;
    for (const card of cards) {
      const show = matchesProject(card.dataset.search, card.dataset.category, search.value, category.value);
      card.hidden = !show;
      if (show) count++;
    }
    document.querySelector('#count').textContent = count ? count + (count === 1 ? ' proyecto' : ' proyectos') : 'No se encontraron proyectos. Prueba otra búsqueda.';
  }
  search.addEventListener('input', filter);
  category.addEventListener('change', filter);
  document.querySelector('#reset').addEventListener('click', () => {
    search.value = ''; category.value = ''; filter(); search.focus();
  });
}
const form = document.querySelector('#commission');
if (form) {
  const money = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const read = name => form.elements.namedItem(name).valueAsNumber;
    const { commission, total } = calculateCommission(read('base'), read('sales'), read('price'));
    document.querySelector('#result').textContent = 'Comisión: ' + money.format(commission) + ' · Sueldo total: ' + money.format(total);
  });
}
