const { JsonDB, Config } = require('node-json-db')
require('dotenv').config()

const dbPath = process.env.db_PATH;
console.log(dbPath, 'dbPath')

// true = save on push, false = pretty print
const db = new JsonDB(new Config(dbPath, true, true, '/'))

// // CREATE
// db.push('/users[]', { id: 1, name: 'Shubham' })

// // READ
// const users = db.getData('/skills')
// users.then((data: unknown) => {
//   console.log(data)
// })

// // UPDATE
// db.push('/users[0]/name', 'New Name', true)

// // DELETE
// db.delete('/users[0]')

module.exports = db;