"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path = require("path");
class AbstractRouter {
    constructor(database) {
        this.database = database;
        this.router = express_1.Router();
        this.allowedMethods = ['get', 'post', 'put', 'patch'];
    }
    /**
     * Register all methods on the parent class
     * Replaces index with / on all methods name
     */
    initRoutes() {
        const [constructor, ...actions] = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        actions.forEach(action => {
            if (!this.allowedMethods.some(method => action.startsWith(method))) {
                return;
            }
            const [method, ...segments] = action.split(/(?=[A-Z])/);
            const url = path.posix.resolve('/', ...segments.map(segment => segment.toLowerCase().replace('index', '/')));
            this.router[method](url, this[action].bind(this));
        });
        return this.router;
    }
    toLowerCase(entry) {
        return entry.toLowerCase();
    }
}
exports.AbstractRouter = AbstractRouter;
//# sourceMappingURL=AbstractRouter.js.map