"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @todo figure out a way to include this css-file without requiring it on the main bundle
 * Important! This must to come before everything for right ordering on the final output file
 */
require("./scss/main.scss");
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const View_vue_1 = require("./components/View.vue");
const Main_vue_1 = require("./Main.vue");
const Parse_1 = require("./Parse");
/**
 * Install Plugins
 */
vue_1.default.use(vue_router_1.default);
const parser = new Parse_1.Parser(require('../config.json'));
const router = new vue_router_1.default({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: View_vue_1.default,
            children: parser.routes(),
            props: {
                menus: parser.getMenus()
            }
        }
    ]
});
new vue_1.default({ el: '#root', router, render: h => h(Main_vue_1.default) });
//# sourceMappingURL=App.js.map