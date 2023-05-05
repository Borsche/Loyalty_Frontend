import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import DragIcon from 'vue-material-design-icons/Drag.vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.component('pencil-icon', PencilIcon)
app.component('check-icon', CheckIcon)
app.component('close-icon', CloseIcon)
app.component('plus-icon', PlusIcon)
app.component('drag-icon', DragIcon)