// import { AbstractRouter } from '../abstracts/AbstractRouter'
//
// export class Home extends AbstractRouter {
//
//     getApiData(request, response) {
//         this.database.find(request.query.table).then(([ result = {} ]) => {
//             response.send(result)
//         })
//     }
//
//     postApi(request, response) {
//
//         const { table, data } = request.body
//
//         this.database.update(table, data).then(result => {
//             if (result === 0) {
//                 return this.database.insert(table, data)
//             }
//         }).then(() => response.send({ success: true }))
//
//     }
//
// }
