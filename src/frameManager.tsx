import { v4 as uuidv4 } from 'uuid'
import { browser, tabManager } from './index'
import React from 'jsx-dom'

class FrameManager {
  public frameContainer: HTMLDivElement
  constructor() {
    this.frameContainer = document.createElement('div')
    this.frameContainer.classList.add('frameContainer')
    browser.root.appendChild(this.frameContainer)
  }

  createFrame(id: string, src: string, defaultUrl = "") {
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

          <input className="action url" data-id={id} value={defaultUrl} />

          <div class="action newtab" onClick={() => tabManager.createTab('New Tab', uuidv4())}>
            <i class="fa-solid fa-plus"></i>
          </div>

          <div
            className="action"
            onClick={() => {
              var frame = document.querySelector(`iframe[data-id="${id}"]`)
              if (!frame) return
              var contentWindow = (frame as HTMLIFrameElement).contentWindow
              if (!contentWindow) return
              // eruda go crazy
              // @ts-expect-error
              if (contentWindow.eruda?._isInit) {
                // @ts-expect-error
                contentWindow.eruda.destroy()
              } else {
                var erudaScript = contentWindow.document.createElement('script')
                erudaScript.src = 'https://cdn.jsdelivr.net/npm/eruda'
                erudaScript.onload = () => {
                  if (!contentWindow) return
                  // @ts-expect-error
                  contentWindow.eruda.init()
                  // @ts-expect-error
                  contentWindow.eruda.position({ x: -10, y: -10 })
                  // @ts-expect-error
                  contentWindow.eruda.show()
                }
                contentWindow.document.body.appendChild(erudaScript)
              }
            }}
          >
            <i class="fa-solid fa-file-code"></i>
          </div>

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

          <div
            className="action"
            onClick={() => {
              tabManager.createTab('Settings', uuidv4(), 'internal/settings.html')
            }}
          >
            <i class="fa-solid fa-gear"></i>
          </div>
        </div>

        <iframe
          src={src}
          data-id={id}
          onLoad={(e) => {
            var contentWindow = (e.target as HTMLIFrameElement).contentWindow
            if (!contentWindow) return;
            tabManager.changeTabTitle(id, (contentWindow as Window).document.title)
            var favicon = contentWindow.document.querySelector('link[rel="icon"], link[rel="shortcut icon"]') as HTMLLinkElement
            if (favicon) tabManager.changeTabIcon(id, favicon.href || '/globe.png')

            // @ts-expect-error (ultraviolet __uv$location doesn't exist in typical contentwindows)
            ;(document.querySelector(`input[data-id="${id}"]`) as HTMLInputElement).value = contentWindow.__uv$location?.href || ''
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
