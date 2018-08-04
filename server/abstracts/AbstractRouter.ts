import { Router } from 'express'
import * as path from 'path'
import { Database } from '../Database'

export abstract class AbstractRouter {

    private router: Router = Router()
    private allowedMethods = [ 'get', 'post', 'put', 'patch' ]

    constructor(protected database: Database) {}

    /**
     * Register all methods on the parent class
     * Replaces index with / on all methods name
     */
    public initRoutes(): Router {

        const [ constructor, ...actions ] = Object.getOwnPropertyNames(
            Object.getPrototypeOf(this)
        )

        actions.forEach(action => {

            if (!this.allowedMethods.some(method => action.startsWith(method))) {
                return
            }

            const [ method, ...segments ] = action.split(/(?=[A-Z])/)

            const url = path.posix.resolve('/', ...segments.map(segment =>
                segment.toLowerCase().replace('index', '/')
            ))

            this.router[ method ](url, this[ action ].bind(this))

        })

        return this.router

    }

    private toLowerCase(entry: string): string {
        return entry.toLowerCase()
    }

}
