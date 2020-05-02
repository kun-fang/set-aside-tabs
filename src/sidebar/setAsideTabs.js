import Vue from 'vue'
import SetAsideTabsApp from './components/SetAsideTabsApp.vue'
import { setAsideTabsCommandName } from '../common/constant.js'

import '../icons/set-aside-icon-48.png'
import '../icons/set-aside-icon-96.png'
import '../icons/windows-icon-48.png'

import "spectre.css/dist/spectre.min.css"

new Vue({
  el: '#app',
  render: h => h(SetAsideTabsApp, {
    props: {
      commandName: setAsideTabsCommandName
    }
  })
})