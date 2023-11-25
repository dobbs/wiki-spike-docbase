/*
  Adapter to convert a wiki panel into an Observable module definition.
*/
export function notebook(plugins) {
  return function notebookFromPanel({
    id,
    flag, /* TODO maybe change flag to site and lookup the flag from the site */
    page: {title, story=[], journal=[]}}) {

    return function define(runtime, observer) {

      const main = runtime.module()
      // TODO main.variable(observer('twins')).define(/* ... */)
      main.variable().define('width', '490px')
      main.variable().define('title', title)
      main.variable().define('flag', flag)
      main.variable().define('panelId', id)
      for(let item of story) {
        // Using item.id to name the Observable variables. Not sure this
        // will be useful. Although id collisions are very unlikely,
        // they are not impossible and they will be very confusing to
        // debug. maybe TODO: guarantee uniqueness here
        //
        // Speculate that wiki's look-left pattern can be represented in
        // Observable by using variable.import() in page modules to the
        // right pulling variables from pages modules to their left.
        // https://github.com/observablehq/runtime#variable_import
        let plugin = plugins.find(({type}) => type == item.type)
        plugin ||= plugins.find(({type}) => type == 'unknown')
        const itemId = `item${item.id}`
        main.variable().define(`boot${item.id}`, () => item)
        main.variable()
          .define(`viewof ${itemId}`, [`boot${item.id}`, ...plugin.deps], plugin.fn)
        main.variable()
          .define(itemId, ['Generators', `viewof ${itemId}`], (G, el) => G.input(el))
      }
      const deps = ['html', 'title', 'flag', 'panelId', 'width',
                    ...story.map(item => `viewof item${item.id}`)]
      main.variable(observer('panel'))
        .define('panel', deps, (html, title, flag, panelId, width, ...story) => {
          return html`
          <article id="${panelId}">
          <div class=twins></div>
          <header><h1><img src="${flag}"> ${title}</h1></header>
          ${story}
          <footer></footer>
          </article>`
        })
      // TODO for(let edit of journal) {/*...*/}

    }


  }
}
