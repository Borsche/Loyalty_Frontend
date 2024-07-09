import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import DragIcon from 'vue-material-design-icons/Drag.vue'
import DashboardIcon from 'vue-material-design-icons/ViewDashboard.vue'
import TreasureChestIcon from 'vue-material-design-icons/TreasureChest.vue'
import SlotMachine from 'vue-material-design-icons/SlotMachine.vue'
import CardIcon from 'vue-material-design-icons/CardText.vue'
import CompareIcon from 'vue-material-design-icons/CompareHorizontal.vue'
import TwitchIcon from 'vue-material-design-icons/Twitch.vue'

import PointsIcon from './components/CustomIcons/PointsIcon.vue'

import App from './App.vue'
import router from './router'

// Import our custom CSS
import './scss/styles.scss'
import 'bootstrap'

import './assets/main.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)


app.component('pencil-icon', PencilIcon)
app.component('check-icon', CheckIcon)
app.component('close-icon', CloseIcon)
app.component('plus-icon', PlusIcon)
app.component('drag-icon', DragIcon)
app.component('dashboard-icon', DashboardIcon)
app.component('chest-icon', TreasureChestIcon)
app.component('slotmachine-icon', SlotMachine)
app.component('card-icon', CardIcon)
app.component('compare-icon', CompareIcon)
app.component('twitch-icon', TwitchIcon)

app.component('points-icon', PointsIcon)

app.mount('#app')