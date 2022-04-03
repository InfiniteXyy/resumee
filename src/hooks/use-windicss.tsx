// A copy of https://github.com/windicss/docs
import Windi from 'windicss'
import { StyleSheet } from 'windicss/utils/style'
import { CSSParser, HTMLParser } from 'windicss/utils/parser'
import { useMemo } from 'react'
import create from 'zustand'
import type Processor from 'windicss'

export const useWindiProcessor = create<{ processor: Processor }>(() => ({ processor: new Windi() }))

export function useWindiCSS(htmlCode: string, styleCode: string) {
  const { processor } = useWindiProcessor()

  const preflightStyles = useMemo(() => {
    return processor.preflight(htmlCode, true, true, true)
  }, [htmlCode, processor])

  const transformStyles = useMemo(() => {
    return new CSSParser(styleCode, processor).parse()
  }, [processor, styleCode])

  const utilityStyles = useMemo(() => {
    return processor.interpret(
      new HTMLParser(htmlCode)
        .parseClasses()
        .map((i) => i.result)
        .join(' ')
    ).styleSheet
  }, [htmlCode, processor])

  const generatedCSS = useMemo(
    () => new StyleSheet().extend(preflightStyles).extend(transformStyles).extend(utilityStyles).sort().build(),
    [preflightStyles, transformStyles, utilityStyles]
  )

  return { processor, generatedCSS }
}
