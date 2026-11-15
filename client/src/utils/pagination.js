export const perPage = 6;

export const visibleItems = (items, page) => {
  return items.slice((page - 1) * perPage, page * perPage)
}
