import React from 'jsx-dom'
import { v4 as uuidv4 } from 'uuid'
import { tabManager, browser, frameManager } from './index'
import config from './config'

export default class TabManager {
  constructor() {
    browser.root.appendChild(
      <>
        <div class="tab-container"></div>
      </>
    )

    setTimeout(() => {
      tabManager.createTab('New Tab', uuidv4())
    })
  }

  changeTabTitle(id: string, text: string) {
    var title: HTMLParagraphElement | null = document.querySelector(`.tab[data-id="${id}"] p`)
    if (!title) return

    title.innerText = text
    title.title = text
  }

  async createTab(name = 'New Tab', id = uuidv4()) {
    if (document.querySelector(`.tab[data-id="${id}"]`)) return console.error('Tab id already exists')

    document.querySelector('.tab-container')?.appendChild(
      <div
        class="tab"
        data-id={id}
        onClick={(e) => {
          if (!(e.target as Element)?.classList.contains('close')) this.focusTab(id)
        }}
      >
        <p title={name}>{name}</p> <i class="close fa-solid fa-xmark" onClick={() => this.closeTab(id)}></i>
      </div>
    )

    var tab = document.querySelector(`.tab[data-id="${id}"`)
    if (!tab) return

    tab?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    this.focusTab(id)
    // @ts-expect-error
    frameManager.createFrame(id, '/service/' + __uv$config.encodeUrl(config.newTab))
  }

  focusTab(id: string) {
    document.querySelectorAll('.tab.active').forEach((tab) => tab.classList.remove('active'))
    var tab = document.querySelector(`.tab[data-id="${id}"]`)
    tab?.classList.add('active')

    frameManager.focusFrame(id)
  }

  closeTab(id: string) {
    var tab = document.querySelector(`.tab[data-id="${id}"]`)
    tab?.remove()

    frameManager.removeFrame(id)
    if (!document.querySelectorAll('.tab[data-id]')[0]) this.createTab()

    var firstTab = document.querySelectorAll('.tab')[0] as HTMLDivElement
    if (firstTab && firstTab.dataset.id) {
      this.focusTab(firstTab.dataset.id)
    }
  }
}
