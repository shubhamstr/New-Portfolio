const { JsonDB, Config } = require('node-json-db')
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

// true = save on push, false = pretty print
const db = new JsonDB(new Config(dbPath, true, true, '/'))

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