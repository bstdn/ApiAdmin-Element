import highlight from './highlight'

const install = function(Vue) {
  Vue.directive('highlight', highlight)
}

if (window.Vue) {
  window['highlight'] = highlight
  Vue.use(install); // eslint-disable-line
}

highlight.install = install
export default highlight
