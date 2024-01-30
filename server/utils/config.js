const dotenv = require('dotenv')

dotenv.config()

const PORT =process.env.PORT
const MONGOURI=process.env.MONGO_URI

module.exports = {PORT, MONGOURI}