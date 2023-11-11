export const Reference = {
  type: 'reference',
  deps: ['html'],
  fn: (item, html) => {
    const {site, slug, title, text} = item
    const flag = `//${site}/favicon.png`
    return html`
      <p data-site="${site}"><img class="remote" src="${flag}">
        <a class="internal" data-title="${title}"
           href="//${site}/${slug}.html">${title}</a> - ${text}`
  }
}
