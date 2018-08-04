"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRouter_1 = require("../abstracts/AbstractRouter");
class Home extends AbstractRouter_1.AbstractRouter {
    getApiData(request, response) {
        this.database.find(request.query.table).then(([result = {}]) => {
            response.send(result);
        });
    }
    postApi(request, response) {
        const { table, data } = request.body;
        this.database.update(table, data).then(result => {
            if (result === 0) {
                return this.database.insert(table, data);
            }
        }).then(() => response.send({ success: true }));
    }
}
exports.Home = Home;
//# sourceMappingURL=Home.js.map