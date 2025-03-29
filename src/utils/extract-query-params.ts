type QueryParam = {
  [key: string]: string
}

export function extractQueryParams(query: string) {
  return query
    .substring(1)
    .split('&')
    .reduce((queryParam, param) => {
      const [key, value] = param.split('=')

      queryParam[key] = value

      return queryParam
    }, {} as QueryParam)
}
