/* eslint key-spacing:0 spaced-comment:0 */
import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'
const pkg = require('../../package.json')

const config = {
  name: 'TradeCove',
  env : process.env.NODE_ENV || process.env.ENV || 'development',
  port : process.env.PORT || 8080,
  // port : process.env.PORT || 3000,
  host: 'trade.mgbeta.ru',

  projectsDir: process.env.projectsDir || '/Users/isuvorov/projects/remote',


  mail: {
    transport: {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'dev@mgbeta.ru',
        pass: 'qwe123qwe',
      },
    },
    options: {
      from: '"TradeCove" <dev@mgbeta.ru>',
    },
  },
  db: {
    // uri: 'mongodb://admin:admin@ds019076.mlab.com:19076/tradecove',
    uri: 'mongodb://s2.mgbeta.ru:10098/trade',
    options: {},
  },
  jwt: {
    secret: 'qweqweqwe12312312',
    devToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1NzU1NjU0YWYxZjJmODA1N2JhM2U3NWUiLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNDY1MjU2Mzc2fQ._eEmsRtL_FuFOwVAtDf5GYio2YSvJwFB0lkSEMxkkbQ'
  }
}

  // env : process.env.NODE_ENV || process.env.ENV || 'development',
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__DEBUG__'    : config.env === 'development' && !process.env.NODEBUG,
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

export default config
