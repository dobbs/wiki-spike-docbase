export const Paragraph = {
  type: 'paragraph',
  deps: ['html'],
  fn: (item, html) => html`<p>${item.text}</p>`
};
