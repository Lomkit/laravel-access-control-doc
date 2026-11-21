type MinimarkNode = string | [string, Record<string, unknown>, ...MinimarkNode[]]

/** Removes the `rel` of every link in a minimark tree. */
function dropLinkRel(node: MinimarkNode): void {
  if (!Array.isArray(node)) {
    return
  }

  const [tag, props, ...children] = node
  if (tag === 'a') {
    delete props.rel
  }
  children.forEach(dropLinkRel)
}

/**
 * Nuxt Content gives external links `rel="nofollow"`, which the Markdown of
 * llms-full.txt would print after each link as `{rel="&#x22;nofollow&#x22;"}`.
 * The attribute means nothing in Markdown: drop it before the page is written.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:llms:generate:document', (_event, doc: { body?: { value?: MinimarkNode[] } }) => {
    doc.body?.value?.forEach(dropLinkRel)
  })
})
