export interface CodeToken {
  text: string
  kind: string
}

const phpRules: [RegExp, string][] = [
  [/\/\/.*/y, 'comment'],
  [/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/y, 'string'],
  [/\$[A-Za-z_]\w*/y, 'variable'],
  [/\b\d+(?:\.\d+)?\b/y, 'number'],
  [/\b(?:true|false|null)\b/y, 'constant'],
  [/\b(?:namespace|use|class|extends|public|protected|private|static|function|return|new|fn|if)\b/y, 'keyword'],
  [/\b(?:array|string|int|bool|void)\b/y, 'type'],
  [/[A-Za-z_]\w*(?=\s*\()/y, 'function'],
  [/\b[A-Z]\w*/y, 'class'],
  [/->|::/y, 'op'],
  [/[A-Za-z_]\w*|\s+/y, 'plain'],
  [/[^\sA-Za-z0-9_]/y, 'punct']
]

/** Tokens of one line of PHP, for the small highlighter of the landing. */
export function tokenizePhp(line: string): CodeToken[] {
  const tokens: CodeToken[] = []
  let index = 0

  while (index < line.length) {
    let length = 1
    let kind = 'plain'

    for (const [pattern, name] of phpRules) {
      pattern.lastIndex = index
      const match = pattern.exec(line)

      if (match && match[0].length > 0) {
        length = match[0].length
        kind = name
        break
      }
    }

    const text = line.slice(index, index + length)
    const previous = tokens[tokens.length - 1]

    if (previous && previous.kind === kind && (kind === 'plain' || kind === 'punct')) {
      previous.text += text
    } else {
      tokens.push({ text, kind })
    }

    index += length
  }

  return tokens
}

/** Parts of a title, each flagged when it matches the search query (case-insensitive). */
export function queryParts(title: string, query: string): { text: string, match: boolean }[] {
  const parts: { text: string, match: boolean }[] = []
  const lower = title.toLowerCase()
  const needle = query.toLowerCase()
  let index = 0

  while (index < title.length) {
    const found = needle ? lower.indexOf(needle, index) : -1

    if (found < 0) {
      parts.push({ text: title.slice(index), match: false })
      break
    }

    if (found > index) {
      parts.push({ text: title.slice(index, found), match: false })
    }

    parts.push({ text: title.slice(found, found + needle.length), match: true })
    index = found + needle.length
  }

  return parts
}
