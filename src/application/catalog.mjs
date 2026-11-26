import { validateProjects } from '../domain/projects.mjs';

export function makeCatalog(projects, caseData) {
  validateProjects(projects, caseData);
  const ordered = [...projects].sort((a, b) => a.title.localeCompare(b.title, 'es'));
  const cases = Object.entries(caseData).map(([id, detail]) => ({
    ...projects.find(project => project.id === id), ...detail, path: '/casos/' + id + '/'
  }));
  return { all: ordered, cases, categories: [...new Set(ordered.map(p => p.category))].sort() };
}
