import { mkdir, writeFile, cp, copyFile, stat, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { makeCatalog } from '../src/application/catalog.mjs';
import { loadData } from '../src/infrastructure/files.mjs';
import { home, archive, casePage, layout } from '../src/presentation/pages.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const { projects, cases } = await loadData();
const catalog = makeCatalog(projects, cases);
for (const project of catalog.cases) await stat(join(root,'public/assets',project.image));
await rm(dist, { recursive: true, force: true });
await cp(join(root, 'public'), dist, { recursive: true });
await copyFile(join(root, 'src/presentation/site.mjs'), join(dist, 'assets/site.mjs'));
await copyFile(join(root, 'src/domain/projects.mjs'), join(dist, 'assets/projects.mjs'));
async function writePage(path, contents) {
  const output = join(dist, path);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, contents);
}
await writePage('index.html', home(catalog));
await writePage('proyectos/index.html', archive(catalog));
for (const project of catalog.cases) await writePage('casos/' + project.id + '/index.html', casePage(project));
await writePage('404.html', layout('Página no encontrada | Holger Ordoñez', 'Regresa al catálogo.', '<section class="wrap section"><h1>Página no encontrada</h1><a href="/proyectos/">Volver al catálogo</a></section>'));
console.log(catalog.all.length + ' proyectos y ' + catalog.cases.length + ' casos generados.');
