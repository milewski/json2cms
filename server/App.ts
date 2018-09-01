import 'reflect-metadata'

import * as bodyParser from 'body-parser'
import * as createApplication from 'express'
import { Express, Request } from 'express-serve-static-core'
import { unflatten } from 'flat'
import * as glob from 'glob'
import { createConnection, getManager } from 'typeorm'
import { Database } from './Database'
import { Parser } from './Parser'

const parser = new Parser(
    glob.sync('./config/**/*.json', { absolute: true })
)

class Server {

    private application: Express = createApplication()
    private database: Database = new Database()

    constructor() {
        this.application = createApplication()
        this.registerPlugins()
        this.registerRoutes()
    }

    public static bootstrap(): Server {
        return new Server()
    }

    public start() {
        this.application.listen(3000, () => console.log('Example app listening on port 3000!'))
    }

    private registerRoutes() {

        this.application.get('/api/menus', async (request: Request, response) => {
            response.json(parser.getMenus())
        })

        this.application.post('/api/:entity', async (req: Request, res) => {

            const postRepository = getManager().getRepository(
                parser.getEntity(req.params.entity)
            )

            // const created = postRepository.create({
            //     'header': 'hi',
            //     'footer.title': 123,
            //     'footer.copyright': 456
            // })

            // await postRepository.save(created)

            const response = await postRepository.find()

            res.json(
                response.map(item => unflatten(item))
            )

        })

        this.application.get('/api/:entity', async (req: Request, res) => {

            if (req.query.schema === 'true') {
                return res.json(
                    parser.getSchema(req.params.entity)
                )
            }

            const postRepository = getManager().getRepository(
                parser.getEntity(req.params.entity)
            )

            const data = await postRepository.findOne()

            res.json(unflatten(data))

        })

    }

    private registerPlugins() {
        this.application.use(bodyParser.json())
        this.application.use(bodyParser.urlencoded({ extended: false }))
    }

}

createConnection({
    type: 'sqlite',
    database: './test.sql',
    entities: parser.getEntities(),
    synchronize: true,
    logging: true
}).then(async connection => {
    Server.bootstrap().start()
})

