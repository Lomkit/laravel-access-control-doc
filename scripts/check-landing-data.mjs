// Checks app/data/landing/eyes.ts against the test output and the README control it was copied from.
// Usage: node scripts/check-landing-data.mjs (Node 24 strips the types of the data file).
import { readFileSync } from 'node:fs'
import { landing } from '../app/data/landing/eyes.ts'

const read = file => readFileSync(new URL(`landing/${file}`, import.meta.url), 'utf8')
const output = JSON.parse(read('landing-search-output.json'))
const readme = read('readme-control.txt').split('\n')
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const problems = []

if (output.scout_driver !== 'database') problems.push('the search did not run on the database engine')
if (output.query !== landing.query) problems.push('query')
if (!same(output.search_uncontrolled, landing.searchUncontrolled)) problems.push('uncontrolled hits')
if (!same(output.posts, landing.posts.map(post => ({ id: post.id, title: post.title, client_id: post.client, author_id: post.author })))) problems.push('posts')

for (const post of output.posts) {
  if (!landing.clients[post.client_id] || !landing.authors[post.author_id]) problems.push(`names of post ${post.id}`)
}

if (!same(Object.keys(output.readers), landing.readers.map(reader => reader.key))) problems.push('readers')

for (const reader of landing.readers) {
  const real = output.readers[reader.key]
  if (!real) continue
  const levels = Array.isArray(real.levels) ? { view: null, update: null } : real.levels
  for (const field of ['listed', 'editable', 'search']) {
    if (!same(real[field], reader[field])) problems.push(`${reader.key} ${field}`)
  }
  if (real.search_total !== reader.searchTotal) problems.push(`${reader.key} search total`)
  if (!same(levels, reader.levels)) problems.push(`${reader.key} levels`)
  if ((real.reader?.name ?? 'Guest') !== reader.name) problems.push(`${reader.key} name`)
}

const start = readme.indexOf('class PostControl extends Control')
if (start < 0 || !same(readme.slice(start, readme.indexOf('}', start) + 1), landing.control)) problems.push('control differs from the README')

const names = Object.values(output.readers).flatMap(real => Array.isArray(real.levels) ? [] : Object.values(real.levels))
for (const [index, level] of landing.levels.entries()) {
  const next = landing.levels[index + 1]
  if (landing.control[level.from]?.trim() !== `${level.name}::new()`) problems.push(`${level.name} does not start on its line`)
  if (level.to !== (next ? next.from - 1 : landing.control.indexOf('            ),') - 1)) problems.push(`${level.name} does not end on its last line`)
}
for (const name of names) {
  if (!landing.levels.some(level => level.name === name)) problems.push(`level ${name} is missing`)
}

if (problems.length) {
  console.error(`app/data/landing/eyes.ts does not match scripts/landing: ${problems.join(', ')}`)
  process.exit(1)
}

console.log('app/data/landing/eyes.ts matches the test output and the README control')
