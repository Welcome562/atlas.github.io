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
      scope: "/service/"
    })
  }
}

export default Browser
