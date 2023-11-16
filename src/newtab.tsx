import React from 'jsx-dom'
import './style.less'

function search(input: string, template = 'https://google.com/search?q=%s') {
  try {
    return new URL(input).toString()
  } catch (err) {}

  try {
    const url = new URL(`http://${input}`)
    if (url.hostname.includes('.')) return url.toString()
  } catch (err) {}
  return template.replace('%s', encodeURIComponent(input))
}

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
