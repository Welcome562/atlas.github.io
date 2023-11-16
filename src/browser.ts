import config from './config'

class Browser {
  public root: HTMLDivElement
  constructor() {
    this.root = document.createElement('div')
    this.root.id = 'root'
    document.body.appendChild(this.root)
    this.registerWorker()
  }

  async registerWorker() {
    await navigator.serviceWorker.register('/sw.js', {
      scope: '/service/'
    })
  }

  search(input: string, template = 'https://google.com/search?q=%s') {
    try {
      if (input.startsWith('atlas://')) {
        var page = input.replace('atlas://', '')
        switch (page) {
          case 'newtab':
            return config.internalPages.newtab
          case 'settings':
            return config.internalPages.settings
        }
      }
      return new URL(input).toString()
    } catch (err) {}

    try {
      const url = new URL(`http://${input}`)
      if (url.hostname.includes('.')) return url.toString()
    } catch (err) {}
    return template.replace('%s', encodeURIComponent(input))
  }
}

export default Browser
