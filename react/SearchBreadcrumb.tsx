import React, { FC } from 'react'
import { BreadcrumbList, ListItem } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'

import { getBaseUrl } from './modules/baseUrl'

interface SearchBreadcrumbItem {
  name: string
  href: string
}

const getSearchBreadcrumb = (breadcrumb?: SearchBreadcrumbItem[]) => {
  if (!Array.isArray(breadcrumb)) {
    return null
  }

  const baseUrl = getBaseUrl()

  const categoryItems: ListItem[] = breadcrumb.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: baseUrl + item.href,
  }))

  return jsonLdScriptProps<BreadcrumbList>({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: categoryItems,
  })
}

interface Props {
  breadcrumb?: SearchBreadcrumbItem[]
}

const SearchBreadcrumbStructuredData: FC<Props> = ({ breadcrumb }) => {
  const breadcrumbLD = getSearchBreadcrumb(breadcrumb)

  if (!breadcrumbLD) {
    return null
  }
  return <script {...breadcrumbLD} />
}

export default SearchBreadcrumbStructuredData
