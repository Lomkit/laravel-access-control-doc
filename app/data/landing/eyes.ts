/**
 * Data of the landing. The posts, lists, Edit buttons and search results were
 * produced by a test run against lomkit/laravel-access-control v1.0.0, with
 * Scout's database engine (scripts/landing/landing-search-output.json).
 * `control` is the PostControl of the package README: its step 1 control, with
 * the searchKeys() lines of its step 4 at the end of the perimeter chains, so
 * the search follows on Meilisearch, Typesense and Algolia as on the database
 * engine. `npm run check:landing` checks this file against both; the `say`
 * sentences and the client names are checked by hand.
 */
export type Ability = 'view' | 'update'

export interface LandingPost {
  id: number
  title: string
  client: number
  author: number
}

export interface LandingReader {
  key: 'admin' | 'manager' | 'author' | 'guest'
  name: string
  label: string
  initials: string
  tone: 'violet' | 'sky' | 'emerald' | 'slate'
  say: string
  /** Name of the perimeter that applies for each ability, null when none does. */
  levels: Record<Ability, string | null>
  listed: number[]
  editable: number[]
  search: number[]
  searchTotal: number
}

/** A level of the control: its perimeter and its lines, 0-based and inclusive. */
export interface LandingLevel {
  name: string
  from: number
  to: number
}

export const landing = {
  query: 'launch',
  searchUncontrolled: [1, 3, 6],
  clients: { 1: 'Acme', 2: 'Globex' } as Record<number, string>,
  authors: { 2: 'Marc', 3: 'Lea', 4: 'Sam', 5: 'Tom' } as Record<number, string>,
  posts: [
    { id: 1, title: 'Q4 launch plan', client: 1, author: 3 },
    { id: 2, title: 'Pricing page copy', client: 1, author: 2 },
    { id: 3, title: 'Launch day checklist', client: 1, author: 4 },
    { id: 4, title: 'Release notes 2.4', client: 1, author: 3 },
    { id: 5, title: 'Brand refresh brief', client: 2, author: 5 },
    { id: 6, title: 'Globex launch recap', client: 2, author: 5 }
  ] as LandingPost[],
  readers: [
    {
      key: 'admin', name: 'Ada', label: 'admin', initials: 'AD', tone: 'violet',
      say: 'Ada is an admin: she sees and edits every post.',
      levels: { view: 'GlobalPerimeter', update: 'GlobalPerimeter' },
      listed: [1, 2, 3, 4, 5, 6], editable: [1, 2, 3, 4, 5, 6], search: [1, 3, 6], searchTotal: 3
    },
    {
      key: 'manager', name: 'Marc', label: 'manages Acme', initials: 'MA', tone: 'sky',
      say: 'Marc manages Acme: he sees and edits Acme’s posts.',
      levels: { view: 'ClientPerimeter', update: 'ClientPerimeter' },
      listed: [1, 2, 3, 4], editable: [1, 2, 3, 4], search: [1, 3], searchTotal: 2
    },
    {
      key: 'author', name: 'Lea', label: 'writer at Acme', initials: 'LE', tone: 'emerald',
      say: 'Lea sees Acme’s posts, edits her own.',
      levels: { view: 'ClientPerimeter', update: 'OwnPerimeter' },
      listed: [1, 2, 3, 4], editable: [1, 4], search: [1, 3], searchTotal: 2
    },
    {
      key: 'guest', name: 'Guest', label: 'not signed in', initials: '', tone: 'slate',
      say: 'Not signed in: nothing.',
      levels: { view: null, update: null },
      listed: [], editable: [], search: [], searchTotal: 0
    }
  ] as LandingReader[],
  control: [
    'class PostControl extends Control',
    '{',
    '    protected string $model = Post::class;',
    '',
    '    protected function perimeters(): array',
    '    {',
    '        return [',
    '            Levels::of(',
    '                GlobalPerimeter::new()',
    '                    ->allowed(fn (User $user, Ability $ability) => $user->can("{$ability} all posts"))',
    '                    ->unrestricted(),',
    '                ClientPerimeter::new()',
    '                    ->allowed(fn (User $user, Ability $ability) => $user->client_id !== null && $user->can("{$ability} client posts"))',
    '                    ->should(fn (User $user, Post $post) => $post->client_id === $user->client_id)',
    '                    ->query(function (Builder $query, User $user): void {',
    '                        $query->where(\'client_id\', $user->client_id);',
    '                    })',
    '                    ->searchKeys(name: \'client\', row: fn (Post $post) => $post->client_id, reader: fn (User $user) => $user->client_id),',
    '                OwnPerimeter::new()',
    '                    ->allowed(fn (User $user, Ability $ability) => $user->can("{$ability} own posts"))',
    '                    ->should(fn (User $user, Post $post) => $post->author_id === $user->id)',
    '                    ->query(function (Builder $query, User $user): void {',
    '                        $query->where(\'author_id\', $user->id);',
    '                    })',
    '                    ->searchKeys(name: \'author\', row: fn (Post $post) => $post->author_id, reader: fn (User $user) => $user->id),',
    '            ),',
    '        ];',
    '    }',
    '}'
  ],
  levels: [
    { name: 'GlobalPerimeter', from: 8, to: 10 },
    { name: 'ClientPerimeter', from: 11, to: 17 },
    { name: 'OwnPerimeter', from: 18, to: 24 }
  ] as LandingLevel[]
}

/**
 * The "before" of the comparison: a hand-written policy and scope, an
 * illustration that is not package code. Line 4 is the one that drifts.
 */
export const beforeCode = [
  '// app/Policies/PostPolicy.php',
  'public function view(User $user, Post $post): bool',
  '{',
  '    return $user->can(\'view all posts\')',
  '        || $post->client_id === $user->client_id',
  '        || $post->author_id === $user->id;',
  '}',
  '',
  '// app/Models/Post.php',
  'public function scopeVisibleTo(Builder $query, User $user): void',
  '{',
  '    if (! $user->can(\'view all posts\')) {',
  '        $query->where(\'author_id\', $user->id);',
  '    }',
  '}'
]

export const beforeDriftLine = 4

/** The "after": the levels of the control, without their indentation. */
export const afterCode = landing.control
  .slice(landing.control.indexOf('            Levels::of('), landing.control.indexOf('            ),') + 1)
  .map(line => line.slice(12))

export const apiRoute = 'Rest::resource(\'posts\', PostsController::class);'
