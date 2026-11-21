type MinimarkNode = string | [string, Record<string, unknown>, ...MinimarkNode[]]

/** Callout components, written as a quote that opens with their label. */
const callouts: Record<string, string> = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
  caution: 'Caution',
  important: 'Important'
}

/** Layout components, replaced by their content. */
const wrappers = new Set(['code-group', 'collapsible', 'steps', 'tabs', 'tabs-item'])

function callout(label: string, content: MinimarkNode[]): MinimarkNode {
  const lead: MinimarkNode = ['strong', {}, `${label}:`]
  const [first, ...rest] = content

  if (Array.isArray(first) && first[0] === 'p') {
    const [, props, ...inline] = first

    return ['blockquote', {}, ['p', props, lead, ' ', ...inline], ...rest]
  }

  return ['blockquote', {}, ['p', {}, lead], ...content]
}

/** The nodes of a minimark tree with their MDC components turned into plain Markdown. */
function plainMarkdown(nodes: MinimarkNode[]): MinimarkNode[] {
  return nodes.flatMap((node): MinimarkNode[] => {
    if (!Array.isArray(node)) {
      return [node]
    }

    const [tag, props, ...children] = node
    const content = plainMarkdown(children)

    if (wrappers.has(tag)) {
      return content
    }

    const label = callouts[tag]

    return [label ? callout(label, content) : [tag, props, ...content]]
  })
}

/**
 * The pages of llms-full.txt would keep their MDC syntax, such as `::note` or
 * `::code-group`, which means nothing to a Markdown reader: write callouts as
 * quotes and drop the layout components around their content.
 *
 * The Markdown writer also prints the first marker of some bold phrases that
 * end with a period as `&#x2A;`, as in `&#x2A;*Read the clock.**`: give them
 * back their `**`.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:llms:generate:document', (_event, doc: { body?: { value?: MinimarkNode[] } }) => {
    if (doc.body?.value) {
      doc.body.value = plainMarkdown(doc.body.value)
    }
  })

  nitroApp.hooks.hook('beforeResponse', (event, response) => {
    if (event.path === '/llms-full.txt' && typeof response.body === 'string') {
      response.body = response.body.replaceAll('&#x2A;*', '**')
    }
  })
})
