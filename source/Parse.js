"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_ui_1 = require("element-ui");
const Form_vue_1 = require("./components/Form.vue");
const NumberParser_vue_1 = require("./parsers/NumberParser.vue");
const TextParser_vue_1 = require("./parsers/TextParser.vue");
class Parser {
    constructor(options) {
        this.options = options;
        this.menus = [];
        this.parsers = {
            text: TextParser_vue_1.default,
            number: NumberParser_vue_1.default
        };
        for (let menu in this.options) {
            this.menus.push(menu);
        }
    }
    getMenus() {
        return this.menus.map(name => {
            return { component: element_ui_1.MenuItem, name, props: true };
        });
    }
    getParsers(route) {
        return this.applyParsers(this.options[route]);
    }
    routes() {
        return this.menus.map(menu => {
            return {
                path: menu,
                name: menu,
                component: Form_vue_1.default,
                props: ({ name, params }) => {
                    return {
                        parsers: this.getParsers(name),
                        table: name,
                        initial: params
                    };
                }
            };
        });
    }
    applyParsers(object) {
        const result = {};
        for (let key in object) {
            result[key] = this.parsers[object[key]];
        }
        return result;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parse.js.map