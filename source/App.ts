import ElementUI from 'element-ui'
// import { Parser } from './Parse'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './Main.vue'
import Layout from './views/Layout.vue'

import './styles/main.scss'

/**
 * Install Plugins
 */
Vue.use(VueRouter)
Vue.use(ElementUI)

const menus = []

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Layout,
            // children: parser.routes(),
            props: {
                menus: menus
            },
            beforeEnter(to, from, next) {

                fetch('/api/menus')
                    .then(response => response.json())
                    .then(data => (menus.push(...data), next()))

            }

        }

    ]
})

new Vue({ el: '#root', router, render: h => h(Main) })
