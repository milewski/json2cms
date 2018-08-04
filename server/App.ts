import * as  bodyParser from 'body-parser'
import * as createApplication from 'express'
import { Express } from 'express-serve-static-core'
import { AbstractRouter } from './abstracts/AbstractRouter'
import { Database } from './Database'
import { Home } from './routes/Home'

class Server {

    private application: Express = createApplication()
    private database: Database = new Database()

    public static bootstrap(): Server {
        return new Server()
    }

    constructor() {
        this.application = createApplication()
        this.registerPlugins()
        this.registerRoutes([ Home ])
    }

    private registerRoutes(routes: (new (database: Database) => AbstractRouter)[]) {
        routes.forEach(Router => {
            this.application.use((new Router(this.database)).initRoutes())
        })
    }

    private registerPlugins() {
        // this.application.use(formidable())
        this.application.use(bodyParser.json())
    }

    public start() {
        this.application.listen(3000, () => console.log('Example app listening on port 3000!'))
    }

}

Server.bootstrap().start()
