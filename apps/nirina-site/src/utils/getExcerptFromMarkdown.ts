export function getExcerptFromMarkdown(content: string): string {
  // Remove frontmatter if present
  const body = content.replace(/^---[\s\S]*?---/, '').trim()
  // Split at the first '---' delimiter in the body
  let [excerpt] = body.split('\n---')

  // Remove images: ![alt](url) or ![](url)
  excerpt = excerpt.replace(/!\[[^\]]*\]\([^)]*\)/g, '')

  // Remove footnote references: [^1], [^note], etc.
  excerpt = excerpt.replace(/\[\^[^\]]+\]/g, '')

  // Remove footnote definitions: lines starting with [^1]:
  excerpt = excerpt.replace(/^\[\^[^\]]+\]:.*$/gm, '')

  // Remove MDX import lines
  excerpt = excerpt.replace(/^import\s.+from\s.+;?$/gm, '')

  // Remove MDX/JSX components: <Component ... /> or <Component></Component>
  excerpt = excerpt.replace(/^<([A-Z][A-Za-z0-9]*)\b[^>]*\/>$/gm, '') // self-closing
  excerpt = excerpt.replace(/^<([A-Z][A-Za-z0-9]*)\b[^>]*>.*?<\/\1>$/gms, '') // block

  return excerpt.trim()
}
