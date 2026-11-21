import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'yaml'
import { packageInfo } from './shared/utils/package-info'
import { docsFirstPage, docsFolder, docsRedirects } from './shared/utils/docs'

const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://laravel-access-control.lomkit.com').replace(/\/$/, '')

/** Removes the ordering prefix of a content file or folder name: `1.getting-started` → `getting-started`. */
function slug(part: string): string {
  return part.replace(/^\d+\./, '')
}

/** Page paths of the docs, read from their content folder. */
function docsPaths(): string[] {
  const files = readdirSync(`content/${docsFolder}`, { recursive: true, encoding: 'utf8' })

  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, '').split(/[\\/]/).map(slug).filter(part => part !== 'index').join('/'))
    .map(path => `/${path}`)
}

/**
 * Title of a section: the `title` of its `.navigation.yml`, or the name that
 * Nuxt Content gives a folder without one (`getting-started` → `Getting Started`).
 */
function sectionTitle(folder: string): string {
  const file = `content/${docsFolder}/${folder}/.navigation.yml`
  const title = existsSync(file) ? (parse(readFileSync(file, 'utf8')) as { title?: unknown } | null)?.title : undefined

  if (typeof title === 'string' && title.trim()) {
    return title.trim()
  }

  return slug(folder).split(/[\s-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

/** Sections of the docs, in navigation order: their title and their path prefix. */
function docsSections(): { title: string, folder: string }[] {
  return readdirSync(`content/${docsFolder}`, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))
    .map(entry => ({ title: sectionTitle(entry.name), folder: slug(entry.name) }))
}

/**
 * Date of the last commit of each content file, keyed by its absolute path.
 * Empty outside a git checkout and in a shallow clone, where every file
 * would get the date of the last commit.
 */
function contentCommitDates(): Map<string, string> {
  const dates = new Map<string, string>()
  const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 })

  try {
    if (git('rev-parse', '--is-shallow-repository').trim() !== 'false') {
      return dates
    }

    const root = git('rev-parse', '--show-toplevel').trim()
    let date = ''

    for (const line of git('log', '--format=%x00%cI', '--name-only', '--', 'content').split('\n')) {
      if (line.startsWith('\0')) {
        date = line.slice(1)
      } else if (line && !dates.has(resolve(root, line))) {
        dates.set(resolve(root, line), date)
      }
    }
  } catch {
    return new Map()
  }

  return dates
}

const commitDates = contentCommitDates()

const redirects = docsRedirects(docsPaths())

/** Static redirect page: GitHub Pages serves files only, no HTTP redirect. */
function redirectPage(to: string): string {
  const url = `${siteUrl}${to}`

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Redirecting to ${to}</title>`
    + `<link rel="canonical" href="${url}"><meta name="robots" content="noindex, follow">`
    + `<meta http-equiv="refresh" content="0; url=${to}"></head>`
    + `<body><a href="${to}">${url}</a></body></html>`
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: siteUrl
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['php', 'bash']
        },
        toc: {
          searchDepth: 1
        }
      }
    }
  },

  routeRules: Object.fromEntries(Object.entries(redirects).map(([from, to]) => [from, { redirect: { to, statusCode: 301 } }])),

  experimental: { asyncContext: true },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/',
        docsFirstPage,
        ...Object.keys(redirects),
        ...docsPaths().map(path => `/raw${path}.md`)
      ],
      crawlLinks: true,
      // Avoid Github pages trailing slash bug
      autoSubfolderIndex: false
    },
    hooks: {
      'prerender:generate'(route) {
        const to = redirects[route.route]
        if (to) {
          route.contents = redirectPage(to)
        }
      }
    }
  },

  hooks: {
    // The date of the last commit of a page: its sitemap lastmod and the dateModified of its structured data.
    'content:file:afterParse'(ctx) {
      const date = commitDates.get(ctx.file.path)

      if (date && !ctx.content.updatedAt) {
        ctx.content.updatedAt = date
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    clientBundle: {
      scan: true
    }
  },

  llms: {
    domain: siteUrl,
    title: `${packageInfo.name} ${packageInfo.docsVersion}`,
    description: `${packageInfo.description} It is for Laravel developers who need each user to reach only some rows of a model, such as the rows of their tenant, of their team or their own rows, and runs on PHP ${packageInfo.php}+ and Laravel ${packageInfo.laravel}.`,
    full: {
      title: `${packageInfo.name} ${packageInfo.docsVersion}: full documentation`,
      description: `Every page of the current version (${packageInfo.docsVersion}) in one Markdown file.`
    },
    sections: [
      {
        title: 'Using these docs with an AI assistant',
        description: [
          `These docs describe ${packageInfo.name} ${packageInfo.docsVersion}, the current version (latest release ${packageInfo.release}). Write ${packageInfo.docsVersion} code from them.`,
          'Every page below is a Markdown copy of the site page. The package ships a Laravel Boost skill named `laravel-access-control`.',
          'Assistants that support MCP can also read these docs through GitMCP: https://lomkit.gitmcp.io/laravel-access-control-doc.'
        ].join(' '),
        links: [
          {
            title: 'Laravel Boost skill',
            href: `${packageInfo.repository}/blob/1.x/resources/boost/skills/laravel-access-control/SKILL.md`,
            description: 'The feature reference that the package gives to coding assistants through Laravel Boost.'
          }
        ]
      },
      ...docsSections().map(({ title, folder }) => ({
        title,
        contentCollection: 'docs' as const,
        contentFilters: [
          { field: 'path', operator: 'LIKE' as const, value: `/${folder}%` }
        ]
      }))
    ]
  },

  sitemap: {
    zeroRuntime: true,
    exclude: Object.keys(redirects)
  }
})
