/*
  We override the html() tagged template literal from Observable
  Standard Library to do three things. First, we expand wiki markup
  for internal and external links. Second, we add target="_blank" to
  any link that's not an internal link. Third, we run all markup
  through DOMPurify to reduce the risk of abusive markup.
 */
import {Library as StandardLibrary} from '../@observablehq/runtime@5/dist/runtime.js';

const stdlib = new StandardLibrary();

function annotateLinks(el) {
  function linked(text) {
    return text
      .replace(/\[\[(.*?)\]\]/g, (_,title) => `<a class="internal" data-title="${title}" href="#">${title}</a>`)
      .replace(/\[(https?:.*?) (.*?)\]/g, (_,url,word) => `<a href="${url.replace(/^https?:/,'')}">${word}</a>`)
  }

  if (el.nodeType && el.nodeType === Element.TEXT_NODE) {
    let child = el.cloneNode();
    el = document.createElement('div');
    el.append(child);
  }

  // iterate all text nodes that have an opening square bracket
  // and replace the markup with HTML links
  const it = document.createNodeIterator(
    el, NodeFilter.SHOW_TEXT, node => /\[/.test(node.textContent) ?
      NodeFilter.FILTER_ACCEPT :
      NodeFilter.FILTER_SKIP
  )
  let textNode, replacements = []
  while ((textNode = it.nextNode())) {
    replacements.push([textNode, linked(textNode.textContent)])
  }
  for (let [node, html] of replacements) {
    const parent = node.parentElement
    parent.insertAdjacentHTML('afterbegin', html);
    node.remove();
  }

  el.querySelectorAll('a').forEach(a => {
    if (a.classList.contains('internal')) {
      // convert click events wiki-link events
      a.onclick = event => {
        event.preventDefault();
        event.stopPropagation();
        a.dispatchEvent(new Event('wiki-link', {bubbles: true}));
      };
    } else {
      a.setAttribute('target', '_blank');
      console.log('external link:', a);
    }
  })
}

export const Library = Object.assign({}, stdlib, {

  async html() {
    const {default:DOMPurify} = await import('../dompurify@3/dist/purify.es.min.js');
    // TODO When do we switch to Observable htx.html?
    const origHtml = await stdlib.html();

    function sanitize(dirty) {
      const linkified = annotateLinks(dirty);
      return DOMPurify.sanitize(dirty, {
        RETURN_DOM: true,
        SANITIZE_DOM: false,
        IN_PLACE: true,
        ADD_TAGS: ['foreignObject', 'feDropShadow'],
        ADD_ATTR: ['target']
      });
    }
    return function sanitizedTaggedTemplateLiteral(...args) {
      return sanitize(origHtml(...args))
    };
  },
});
