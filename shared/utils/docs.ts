import { packageInfo } from './package-info'

/**
 * The documentation pages live in `content/<docsFolder>` and are served at the
 * root. A second major version would follow laravel-rest-api-doc: a list of
 * versions, one collection each, and a switcher.
 */
export const docsFolder = packageInfo.docsVersion

/** First page of the docs, the target of "Get started". */
export const docsFirstPage = '/getting-started/introduction'

/**
 * Pages of the 0.x site, which served them at the root, with the 1.x page that
 * replaces each one. While a page has no 1.x equivalent yet, it points to the
 * closest one: the installation page for getting started, the upgrade guide
 * otherwise. When a 1.x page takes the old path itself, its redirect is
 * dropped by `docsRedirects()`: adding the page is enough.
 */
export const legacyPages: Record<string, string> = {
  '/getting-started/installation': '/getting-started/installation',
  '/getting-started/concept': '/getting-started/introduction',
  '/essentials/perimeters': '/essentials/perimeters',
  '/essentials/controls': '/essentials/controls',
  '/essentials/policies': '/essentials/policies',
  '/essentials/usage': '/essentials/queries',
  '/digging-deeper/scout': '/search/overview'
}

/**
 * Redirects of every old URL whose page no longer exists, among `paths`, the
 * page paths of the docs. Throws when an old URL points to a page that does
 * not exist, so that a renamed page cannot leave a redirect to nowhere or to
 * itself.
 */
export function docsRedirects(paths: string[]): Record<string, string> {
  const redirects: Record<string, string> = {}

  for (const [from, to] of Object.entries(legacyPages)) {
    if (!paths.includes(to)) {
      throw new Error(`legacyPages in shared/utils/docs.ts sends ${from} to ${to}, which is not a page of content/${docsFolder}.`)
    }

    if (from !== to && !paths.includes(from)) {
      redirects[from] = to
    }
  }

  return redirects
}
