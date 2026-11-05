import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { profile, projects, replies } from '../lib/content.ts';

assert.equal(new Set(projects.map(project => project.id)).size, projects.length);
for (const project of projects) {
  assert.ok(existsSync(`public${project.image}`), `Missing image: ${project.image}`);
  assert.ok(project.details.length && project.description && project.role);
  if (['pos', 'finance'].includes(project.id)) {
    assert.match(project.note, /dummy/i);
    assert.ok(existsSync(`public/portfolio/${project.id}-mobile.webp`));
  }
}
assert.match(projects.find(project => project.id === 'coolgo').note, /proyeksi/);
assert.match(profile.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
for (const reply of Object.values(replies)) assert.ok(['#about', '#work', '#contact'].includes(reply.link));
assert.ok(existsSync('public/portfolio/sherindiva-portfolio.pdf'));
console.log('Content, asset, disclosure, and navigation checks passed.');
