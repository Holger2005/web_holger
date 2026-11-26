import { readFile } from 'node:fs/promises';
export async function loadData() {
  const read = async name => JSON.parse(await readFile(new URL('../../content/' + name + '.json', import.meta.url), 'utf8'));
  const [projects, cases] = await Promise.all([read('projects'), read('cases')]);
  return { projects, cases };
}
