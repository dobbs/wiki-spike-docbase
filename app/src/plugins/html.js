export const Html = {
  type: 'html',
  deps: ['html'],
  fn: (item, html) => html({raw:[item.text]})
}
