export default defineAppConfig({
  ui: {
    colors: {
      primary: 'orange',
      neutral: 'slate'
    }
  },
  uiPro: {
    footer: {
      slots: {
        root: 'border-t border-(--ui-border)',
        left: 'text-sm text-(--ui-text-muted)'
      }
    }
  },
  seo: {
    siteName: 'Laravel Access Control - Lomkit'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Lomkit/laravel-access-control',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Lomkit/laravel-access-control',
      'target': '_blank',
      'aria-label': 'Laravel Access Control on Github'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/lomkit/laravel-access-control-doc/edit/master/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/lomkit/laravel-access-control',
        target: '_blank'
      }]
    }
  },
  sponsors: {
    title: 'Sponsors',
    links: [{
      icon: 'i-mdi-hand-heart-outline',
      label: 'Become a sponsor',
      to: 'https://github.com/sponsors/GautierDele',
      target: '_blank'
    }]
  }
})
