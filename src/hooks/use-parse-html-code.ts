import { marked } from 'marked'
import { useWindiCSS } from './use-windicss'

export function useParseHTMLConfig(resumeContent: string) {
  return useMemo(() => {
    const matchedConfig = /^-+$\n(?<config>[^]+)\n^-+$/m.exec(resumeContent)
    return (matchedConfig?.groups?.config ?? '').split('\n').reduce((prev: { [key: string]: string }, cur) => {
      const [key, value] = cur
        .trim()
        .split(':')
        .map((i) => i.trim())
      if (key && value) prev[key] = value
      return prev
    }, {})
  }, [resumeContent])
}

export function useParseHTMLCode(resumeContent: string, styleContent: string) {
  const config = useParseHTMLConfig(resumeContent)

  const htmlCode = useMemo(() => {
    return `${config.title ? `<div class="title">${config.title}</div>` : ''}${marked.parse(
      resumeContent.replace(/^-+$\n(?<config>[^]+)\n^-+$/m, '')
    )}`
  }, [config.title, resumeContent])

  const { generatedCSS } = useWindiCSS(htmlCode, styleContent)

  return { htmlCode, generatedCSS, config }
}
