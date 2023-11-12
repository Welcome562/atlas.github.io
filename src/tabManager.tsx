import React from 'jsx-dom'
import { v4 as uuidv4 } from 'uuid'
import { tabManager, browser, frameManager } from './index'

export default class TabManager {
  constructor() {
    browser.root.appendChild(
      <>
        <div class="tab-container">
          <div class="tab newtab" onClick={() => tabManager.createTab('New Tab', uuidv4())}>
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>
      </>
    )
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

    frameManager.createFrame(id, '/service/' + btoa('https://www.startpage.com/do/mypage.pl?prfe=1c0cff439c2ef668a15a8ecd3733342f1bc9f11f85e59c569e271aaf1ce1be063d298a7b459c7772a32f8a2fac2bac1bf4088ad78467fda96532a8dbd3ab48c6ef2ade22bd729f2f096544cc'))
  }

  focusTab(id: string) {
    document.querySelectorAll('.tab.active').forEach((tab) => tab.classList.remove('active'))
    var tab = document.querySelector(`.tab[data-id="${id}"]`)
    tab?.classList.add('active')

    setTimeout(() => frameManager.focusFrame(id))
  }

  closeTab(id: string) {
    var tab = document.querySelector(`.tab[data-id="${id}"]`)
    tab?.remove()
    
    frameManager.removeFrame(id)
  }
}
