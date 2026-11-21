/**
 * Loads the navigation of the docs and the search sections, and provides the
 * navigation to the layout and the header. The provide runs before the
 * await: it needs the component instance.
 */
export async function useDocsNavigation() {
  const navigationRequest = useAsyncData('navigation', () => queryCollectionNavigation('docs'))
  const navigation = navigationRequest.data

  const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
    server: false
  })

  provide('navigation', navigation)

  await navigationRequest

  return { navigation, files }
}
