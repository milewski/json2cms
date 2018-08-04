"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
class Database {
    constructor() {
        this.config = require('../config.json');
        this.instance = Knex({
            client: 'sqlite3',
            useNullAsDefault: true,
            connection: {
                filename: 'example.db'
            }
        });
        this.initiateTables();
        this.instance.schema.createTable('static', table => {
            table.increments();
            table.string('key');
            table.string('value');
            table.string('type');
            table.timestamps(true, true);
        }).catch(error => {
            // console.log(error.message)
        });
        this.instance.select('*').table('static').then(a => {
            console.log(a);
        });
    }
    initiateTables() {
        const promises = [];
        for (let key in this.config) {
            promises.push(this.createTableIfDoestExist(key, this.config[key]));
        }
        return promises;
    }
    createTableIfDoestExist(name, columns) {
        return this.instance.schema.hasTable(name).then(exists => {
            if (!exists) {
                return this.instance.schema.createTable(name, table => {
                    table.increments('id').primary();
                    for (let key in columns) {
                        table.string(key);
                    }
                    table.timestamps(true, true);
                });
            }
        });
    }
    update(table, data) {
        return this.instance(table).update(data);
    }
    insert(table, data) {
        return this.instance(table).insert(data);
    }
    find(table) {
        return this.instance(table).select();
    }
    formatData(data) {
        //.reduce((a, b) => ({ ...a, ...b }), {})
        return Object.keys(data).map(key => ({ key, value: data[key] }));
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map