import { flatten } from 'flat'
import * as path from 'path'
import { plural } from 'pluralize'
import { EntitySchema } from 'typeorm'

export class Parser {

    private entities = {}

    constructor(private config: any[] = []) {}

    public getMenus(): string[] {
        return Object.keys(this.entities)
    }

    public getEntity(name: string) {
        return this.entities[ name ]
    }

    public getEntities() {

        return this.config.map(config => {

            const { name } = path.parse(config)
            const columns = flatten(require(config))

            for (const key in columns) {
                columns[ key ] = {
                    type: String
                }
            }

            return this.entities[ name ] = new EntitySchema({
                name: plural(name),
                columns: {
                    id: {
                        type: Number,
                        primary: true,
                        generated: true
                    },
                    ...columns
                }
            })

        })

    }

    getRoutes() {

        const routes = []

        for (const key in this.config) {
            routes.push({
                path: `/${key}`
            })
        }

        return []

    }

}
