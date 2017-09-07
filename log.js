const log4js = require('log4js')

log4js.configure('./config/log4js.json')
const log = (type) => log4js.getLogger(type)

module.exports = log
