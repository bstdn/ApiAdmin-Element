import Hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export default {
  inserted: function(el) {
    const blocks = el.querySelectorAll('pre code')
    for (let i = 0; i < blocks.length; i++) {
      Hljs.highlightBlock(blocks[i])
    }
  },
  componentUpdated: function(el) {
    const blocks = el.querySelectorAll('pre code')
    for (let i = 0; i < blocks.length; i++) {
      Hljs.highlightBlock(blocks[i])
    }
  }
}
