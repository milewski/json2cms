/**
 * @todo figure out a way to include this css-file without requiring it on the main bundle
 * Important! This must to come before everything for right ordering on the final output file
 */
import './scss/main.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'
import View from './components/View.vue'
import Main from './Main.vue'
import { Parser } from './Parse'

/**
 * Install Plugins
 */
Vue.use(VueRouter)

const parser = new Parser(require('../config.json'))

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: View,
            children: parser.routes(),
            props: {
                menus: parser.getMenus()
            }
        }
    ]
})

new Vue({ el: '#root', router, render: h => h(Main) })
