import Vue from 'vue'
import VueRouter from 'vue-router'
import View from './components/View.vue'
import Main from './Main.vue'
// import { Parser } from './Parse'

/**
 * Install Plugins
 */
Vue.use(VueRouter)

// const parser = new Parser(require('../config/home.json'))

const menus = []

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: View,
            // children: parser.routes(),
            props: {
                menus: menus
            },
            beforeEnter(to, from, next) {

                fetch('/api/menus')
                    .then(response => response.json())
                    .then(data => void menus.push(...data) || next())

            }

        }

    ]
})

new Vue({ el: '#root', router, render: h => h(Main) })
