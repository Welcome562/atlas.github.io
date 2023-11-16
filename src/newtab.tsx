import React from 'jsx-dom'
import search from './search'
import './style.less'

document.querySelector('#settings')?.appendChild(
  <>
    <h1>Atlas Browser</h1> <br></br>
    <input
      type="text"
      placeholder="Enter a search query or URL"
      onKeyDown={(e) => {
        if (e.key == 'Enter') {
          var input = e.target as HTMLInputElement
          var url = search(input.value)
          // @ts-expect-error
          location.href = '/service/' + __uv$config.encodeUrl(url)
        }
      }}
    />
  </>
)
