import React from 'react'
import { WebSite } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'

import { getBaseUrl } from './modules/baseUrl'

interface Props {
  searchTermPath?: string
}

const abc = (baseUrl: string, path: string) => {
  return jsonLdScriptProps<WebSite>({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}${path}{search_term_string}?map=ft`,
      // @ts-expect-error it's a valid property
      'query-input': 'required name=search_term_string',
    },
  })
}

function SearchAction({ searchTermPath }: Props) {
  const baseUrl = getBaseUrl()
  const path = !searchTermPath ? '/' : searchTermPath

  const json = abc(baseUrl, path)



  return <script {...json} />

}

export default SearchAction
