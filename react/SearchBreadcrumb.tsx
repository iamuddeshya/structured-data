import React, { FC } from 'react'
import { BreadcrumbList } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'

import { getBaseUrl } from './modules/baseUrl'

interface SearchBreadcrumbItem {
  name: string
  href: string
}

const getSearchBreadcrumb = (breadcrumb?: SearchBreadcrumbItem[]) => {
  if (!Array.isArray(breadcrumb)) {
    return {}
  }

  const baseUrl = getBaseUrl()

  return jsonLdScriptProps<BreadcrumbList>({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: baseUrl + item.href,
    })),
  })
}

interface Props {
  breadcrumb?: SearchBreadcrumbItem[]
}

const SearchBreadcrumbStructuredData: FC<Props> = ({ breadcrumb }) => {
  const breadcrumbLD = getSearchBreadcrumb(breadcrumb)

  return <script {...breadcrumbLD} />
}

export default SearchBreadcrumbStructuredData
