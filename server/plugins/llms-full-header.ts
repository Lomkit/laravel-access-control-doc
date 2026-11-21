/**
 * Opens llms-full.txt with the package, its version and its requirements, so
 * that a reader of the file alone knows which version the pages describe.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('llms:generate:full', (_event, _options, contents) => {
    contents.unshift([
      `# ${packageInfo.name} ${packageInfo.docsVersion}: full documentation`,
      `> ${packageInfo.description}`,
      [
        `This file holds every page of ${packageInfo.name} ${packageInfo.docsVersion}, the current version (latest release ${packageInfo.release}).`,
        `It requires PHP ${packageInfo.php}+ and Laravel ${packageInfo.laravel} and installs with \`composer require ${packageInfo.composerName}\`.`
      ].join(' ')
    ].join('\n\n'))
  })
})
