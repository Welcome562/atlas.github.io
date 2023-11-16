import config from './config'
export default function search(input: string, template = 'https://google.com/search?q=%s') {
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
