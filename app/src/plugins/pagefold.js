export const Pagefold = {
  type: 'pagefold',
  deps: ['html'],
  fn: (item, html) => html`<hr class="pagefold" data-content="${item.text}">`
}
