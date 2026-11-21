// Checks app/data/landing/eyes.ts against the test output and the README blocks it was copied from.
// Usage: node scripts/check-landing-data.mjs (Node 24 strips the types of the data file).
import { readFileSync } from 'node:fs'
import { afterCode, landing } from '../app/data/landing/eyes.ts'

const read = file => readFileSync(new URL(`landing/${file}`, import.meta.url), 'utf8')
const output = JSON.parse(read('landing-search-output.json'))
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const problems = []

/**
 * The README control: the class of step 1, with each searchKeys() line of step 4
 * appended to the chain of its perimeter, indented like the chain.
 */
function readmeControl() {
  const step1 = read('readme-step1-control.txt').split('\n')
  const start = step1.indexOf('class PostControl extends Control')
  const control = step1.slice(start, step1.indexOf('}', start) + 1)
  let perimeter = null

  for (const line of read('readme-step4-search-keys.txt').split('\n')) {
    if (/^\w+::new\(\)$/.test(line)) {
      perimeter = line
    } else if (line.trim().startsWith('->searchKeys(')) {
      const first = control.findIndex(item => item.trim() === perimeter)
      const next = control.findIndex((item, index) => index > first && /^\s*(\w+::new\(\)|\),)$/.test(item))
      const last = next - 1

      if (first < 0 || next < 0 || !control[last].endsWith(',')) {
        problems.push(`README step 4 names ${perimeter}, which has no chain in step 1`)
        continue
      }

      const indent = control[first + 1].match(/^ */)[0]
      control[last] = control[last].slice(0, -1)
      control.splice(next, 0, `${indent}${line.trim()}`)
    }
  }

  return control
}

if (!output.package.includes('v1.0.0')) problems.push('the test output is not from v1.0.0')
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
  // The readers of the run are also authors of posts: their names must match.
  if (real.reader && real.reader.id in landing.authors && landing.authors[real.reader.id] !== real.reader.name) problems.push(`author ${real.reader.id} name`)
}

if (!same(readmeControl(), landing.control)) problems.push('control differs from the README (step 1 control with the step 4 search keys)')

for (const [index, level] of landing.levels.entries()) {
  const next = landing.levels[index + 1]
  if (landing.control[level.from]?.trim() !== `${level.name}::new()`) problems.push(`${level.name} does not start on its line`)
  if (level.to !== (next ? next.from - 1 : landing.control.indexOf('            ),') - 1)) problems.push(`${level.name} does not end on its last line`)
}

const names = Object.values(output.readers).flatMap(real => Array.isArray(real.levels) ? [] : Object.values(real.levels))
for (const name of names) {
  if (!landing.levels.some(level => level.name === name)) problems.push(`level ${name} is missing`)
}

if (afterCode[0] !== 'Levels::of(' || afterCode[afterCode.length - 1] !== '),') problems.push('afterCode is not the Levels::of() block')

if (problems.length) {
  console.error(`app/data/landing/eyes.ts does not match scripts/landing: ${problems.join(', ')}`)
  process.exit(1)
}

console.log('app/data/landing/eyes.ts matches the test output and the README control')
