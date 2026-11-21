/**
 * Head tags shared by every page: a self canonical link, and the WebSite and
 * SoftwareSourceCode structured data on the landing page.
 */
export function useSiteSeo() {
  const route = useRoute()
  const site = useSiteConfig()
  const siteUrl = site.url.replace(/\/$/, '')

  const author = {
    '@type': 'Organization',
    'name': 'Lomkit',
    'url': 'https://github.com/Lomkit'
  }

  useHead({
    link: [
      { rel: 'canonical', href: () => `${siteUrl}${route.path}` }
    ],
    script: () => route.path === '/'
      ? [{
          key: 'ld-software',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': `${siteUrl}/#website`,
                'name': packageInfo.name,
                'description': `Documentation of ${packageInfo.name} ${packageInfo.docsVersion}.`,
                'url': `${siteUrl}/`,
                'inLanguage': 'en',
                'about': { '@id': `${siteUrl}/#software` },
                'publisher': author
              },
              {
                '@type': 'SoftwareSourceCode',
                '@id': `${siteUrl}/#software`,
                'name': packageInfo.name,
                'alternateName': packageInfo.composerName,
                'description': packageInfo.description,
                'url': `${siteUrl}/`,
                'codeRepository': packageInfo.repository,
                'programmingLanguage': {
                  '@type': 'ComputerLanguage',
                  'name': 'PHP'
                },
                'runtimePlatform': `PHP ${packageInfo.php}+, Laravel ${packageInfo.laravel}`,
                'softwareVersion': packageInfo.release,
                'license': packageInfo.license,
                'author': author
              }
            ]
          })
        }]
      : []
  })
}
