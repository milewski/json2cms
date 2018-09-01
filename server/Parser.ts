import { flatten, unflatten } from 'flat'
import * as path from 'path'
import { plural } from 'pluralize'
import { EntitySchema } from 'typeorm'

export class Parser {

    private entities = {}
    private schemas = {}

    constructor(private config: any[] = []) {}

    public getMenus(): string[] {
        return Object.keys(this.entities)
    }

    public getEntity(name: string): EntitySchema<{}> {
        return this.entities[ name ]
    }

    public getSchema(name: string) {
        return unflatten(this.schemas[ name ])
    }

    public getEntities() {

        return this.config.map(config => {

            const { name } = path.parse(config)
            const columns = flatten(require(config))

            this.schemas[ name ] = Object.assign({}, columns)

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
