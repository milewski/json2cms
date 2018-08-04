import * as  bodyParser from 'body-parser'
import * as createApplication from 'express'
import { Express, Request } from 'express-serve-static-core'
import { unflatten } from 'flat'
import * as glob from 'glob'
import 'reflect-metadata'
import { createConnection, getManager } from 'typeorm'
import { Database } from './Database'
import { Parser } from './Parser'

const parser = new Parser(
    glob.sync('./config/**/*.json', { absolute: true })
)

class Server {

    private application: Express = createApplication()
    private database: Database = new Database()

    public static bootstrap(): Server {
        return new Server()
    }

    constructor() {
        this.application = createApplication()
        this.registerPlugins()
        this.registerRoutes()
    }

    private registerRoutes() {

        this.application.use('/api/menus', async (req: Request, res) => {
            res.json(parser.getMenus())
        })

        this.application.use('/:entity', async (req: Request, res) => {

            const postRepository = getManager().getRepository(
                parser.getEntity(req.params.entity)
            )

            const data = await postRepository.findOne()

            res.json(unflatten(data))

        })

    }

    private registerPlugins() {
        this.application.use(bodyParser.json())
    }

    public start() {
        this.application.listen(3000, () => console.log('Example app listening on port 3000!'))
    }

}

createConnection({
    type: 'mysql',
    host: '0.0.0.0',
    port: 3306,
    username: 'root',
    password: 'secret',
    database: 'test',
    entities: parser.getEntities(),
    synchronize: true,
    logging: false
}).then(async connection => {
    Server.bootstrap().start()
})

