"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const createApplication = require("express");
const Database_1 = require("./Database");
const Home_1 = require("./routes/Home");
class Server {
    constructor() {
        this.application = createApplication();
        this.database = new Database_1.Database();
        this.application = createApplication();
        this.registerPlugins();
        this.registerRoutes([Home_1.Home]);
    }
    static bootstrap() {
        return new Server();
    }
    registerRoutes(routes) {
        routes.forEach(Router => {
            this.application.use((new Router(this.database)).initRoutes());
        });
    }
    registerPlugins() {
        // this.application.use(formidable())
        this.application.use(bodyParser.json());
    }
    start() {
        this.application.listen(3000, () => console.log('Example app listening on port 3000!'));
    }
}
Server.bootstrap().start();
//# sourceMappingURL=App.js.map