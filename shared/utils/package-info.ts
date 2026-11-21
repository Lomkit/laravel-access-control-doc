/**
 * Facts about the package, used by llms.txt, the structured data of the pages
 * and the version badge of the social images. Update `release` with each
 * release, next to the upgrade guide, and the requirements with composer.json.
 */
export const packageInfo = {
  name: 'Laravel Access Control',
  composerName: 'lomkit/laravel-access-control',
  release: '1.0.0',
  docsVersion: '1.x',
  php: '8.3',
  laravel: '13',
  repository: 'https://github.com/Lomkit/laravel-access-control',
  license: 'https://opensource.org/licenses/MIT',
  description: 'Laravel Access Control (lomkit/laravel-access-control) is a Laravel package that declares in one control who can see and change each Eloquent model: its perimeters drive the policies, the query scopes and the Scout searches.'
}
