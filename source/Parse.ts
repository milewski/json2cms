import FormComponent from './components/Form.vue'

type ParserType = 'text' | 'number'

export class Parser {

    private menus: string[] = []
    private parsers = {
        // text: TextParser,
        // number: NumberParser
    }

    constructor(private options) {
        for (let menu in this.options) {
            // this.menus.push(menu)
        }
    }

    public getMenus() {
        return this.menus.map(name => {
            // return { component: MenuItem, name, props: true }
        })
    }

    public getParsers(route: string) {
        return this.applyParsers(this.options[ route ])
    }

    public routes() {

        return this.menus.map(menu => {

            return {
                path: menu,
                name: menu,
                component: FormComponent,
                props: ({ name, params }) => {
                    return {
                        parsers: this.getParsers(name),
                        table: name,
                        initial: params
                    }
                }
            }

        })

    }

    private applyParsers(object: { [ key: string ]: ParserType }): { [ key: string ]: new () => any } {

        const result = {}

        for (let key in object) {
            result[ key ] = this.parsers[ object[ key ] ]
        }

        return result

    }

}
