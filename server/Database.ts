import * as Knex from 'knex'
import { QueryBuilder } from 'knex'

export class Database {

    private config = require('../config.json')
    private instance = Knex({
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: 'example.db'
        }
    })

    constructor() {
        this.initiateTables()
        this.instance.schema.createTable('static', table => {
            table.increments()
            table.string('key')
            table.string('value')
            table.string('type')
            table.timestamps(true, true)
        }).catch(error => {
            // console.log(error.message)
        })

        this.instance.select('*').table('static').then(a => {
            console.log(a)
        })

    }

    private initiateTables() {
        const promises = []
        for (let key in this.config) {
            promises.push(
                this.createTableIfDoestExist(key, this.config[ key ])
            )
        }
        return promises
    }

    private createTableIfDoestExist(name: string, columns: { [key: string]: string | number }) {
        return this.instance.schema.hasTable(name).then(exists => {
            if (!exists) {
                return this.instance.schema.createTable(name, table => {
                    table.increments('id').primary()
                    for (let key in columns) { table.string(key) }
                    table.timestamps(true, true)
                })
            }
        })
    }

    public update(table: string, data: { [key: string]: string }): QueryBuilder {
        return this.instance(table).update(data)
    }

    public insert(table: string, data: { [key: string]: string }): QueryBuilder {
        return this.instance(table).insert(data)
    }

    public find(table: string): QueryBuilder {
        return this.instance(table).select()
    }

    private formatData(data: { [key: string]: string }): { key: string, value: string }[] {
        //.reduce((a, b) => ({ ...a, ...b }), {})
        return Object.keys(data).map(key => ({ key, value: data[ key ] }))
    }

}
