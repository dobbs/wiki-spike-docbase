import {Inspector} from '../../@observablehq/runtime@5/dist/runtime.js';
export const Unknown = {
  type: 'unknown',
  deps: ['html'],
  fn: (item, html) => {
    const div = document.createElement('div')
    div.classList.add('item', 'unknown')
    const inspector = new Inspector(div)
    inspector.fulfilled(item)
    div.prepend(html`<p><em>Unknown type:</em> ${item.type}`)
    return div
  }
}
