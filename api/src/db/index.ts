import { JsonDB, Config } from 'node-json-db'
import * as dotenv from 'dotenv'

dotenv.config()

const dbPath = process.env.db_PATH

if (!dbPath) {
  throw new Error('db_PATH is not set')
}

// true = save on push, false = pretty print
const db = new JsonDB(new Config(dbPath, true, true, '/'))

export default db
