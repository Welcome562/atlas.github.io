import { browser, tabManager } from './index'
import React from 'jsx-dom'

class FrameManager {
  public frameContainer: HTMLDivElement
  constructor() {
    this.frameContainer = document.createElement('div')
    this.frameContainer.classList.add('frameContainer')
    browser.root.appendChild(this.frameContainer)
  }

  createFrame(id: string, src: string) {
    document.querySelectorAll('.frame').forEach((frame) => ((frame as HTMLDivElement).style.display = 'none'))

    this.frameContainer.appendChild(
      <div data-id={id} class="frame">
        <div class="toolbar">
          <div
            className="action"
            onClick={() => {
              var frame = document.querySelector(`iframe[data-id="${id}"]`)
              if (!frame) return
              ;(frame as HTMLIFrameElement).contentWindow?.history.back()
            }}
          >
            <i class="fa-solid fa-arrow-left"></i>
          </div>
          <div
            className="action"
            onClick={() => {
              var frame = document.querySelector(`iframe[data-id="${id}"]`)
              if (!frame) return
              ;(frame as HTMLIFrameElement).contentWindow?.location.reload()
            }}
          >
            <i class="fa-solid fa-rotate-right"></i>
          </div>
          <input className="action url" data-id={id} />
          <div
            className="action"
            onClick={() => {
              var frame = document.querySelector(`iframe[data-id="${id}"]`)
              if (!frame) return
              window.open((frame as HTMLIFrameElement).src)
            }}
          >
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </div>
          <div className="action">
            <i class="fa-solid fa-gear"></i>
          </div>
        </div>
        <iframe
          src={src}
          data-id={id}
          onLoad={(e) => {
            tabManager.changeTabTitle(id, ((e.target as HTMLIFrameElement).contentWindow as Window).document.title)
            // @ts-expect-error (ultraviolet __uv$location doesn't exist in typical contentwindows)
            ;(document.querySelector(`input[data-id="${id}"]`) as HTMLInputElement).value = (e.target as HTMLIFrameElement).contentWindow?.__uv$location.href
          }}
        ></iframe>
      </div>
    )
  }

  removeFrame(id: string) {
    var frame = document.querySelector(`.frame[data-id="${id}"]`)
    if (!frame) return
    ;(frame as HTMLDivElement).remove()
  }

  focusFrame(id: string) {
    document.querySelectorAll('.frame').forEach((frame) => {
      ;(frame as HTMLDivElement).style.display = 'none'
    })

    var frame = document.querySelector(`.frame[data-id="${id}"]`)
    if (!frame) return
    ;(frame as HTMLDivElement).style.display = 'block'
  }
}

export default FrameManager
