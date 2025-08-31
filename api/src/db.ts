const { JsonDB, Config } = require('node-json-db')

// true = save on push, false = pretty print
const db = new JsonDB(new Config('db', true, false, '/'))

// // CREATE
// db.push('/users[]', { id: 1, name: 'Shubham' })

// // READ
// const users = db.getData('/users')
// console.log(users)

// // UPDATE
// db.push('/users[0]/name', 'New Name', true)

// // DELETE
// db.delete('/users[0]')

module.exports = db;