import Browser from './browser'
import TabManager from './tabManager'
import FrameManager from './frameManager'

import './style.less'

export const browser = new Browser()
export const tabManager = new TabManager()
export const frameManager = new FrameManager()

if (!localStorage.getItem("loaded")) {
  location.reload()
  localStorage.setItem("loaded", "true")
}