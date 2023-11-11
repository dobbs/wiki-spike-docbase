export const Html = {
  type: 'html',
  deps: ['html'],
  fn: (item, html) => html`${item.text}`
}
