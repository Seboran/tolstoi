export function getExcerptFromMarkdown(content: string): string {
  // Remove frontmatter if present
  const body = content.replace(/^---[\s\S]*?---/, '').trim()
  // Split at the first '---' delimiter in the body
  let [excerpt] = body.split('\n---')

  // Remove images: ![alt](url) or ![](url)
  excerpt = excerpt.replace(/!\[[^\]]*\]\([^\)]*\)/g, '')

  // Remove footnote references: [^1], [^note], etc.
  excerpt = excerpt.replace(/\[\^[^\]]+\]/g, '')

  // Remove footnote definitions: lines starting with [^1]:
  excerpt = excerpt.replace(/^\[\^[^\]]+\]:.*$/gm, '')

  return excerpt.trim()
}
