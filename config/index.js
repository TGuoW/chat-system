'use strict'

const path = require('path')

const routerConf = require('../src/mock/config/router')
const serverConf = require('../src/mock/config/default')

let proxyTable = {};
for (let api in routerConf) {
  api = api.indexOf(' ') > 0
    ? api.split(' ')[1]
    : api;
  proxyTable[api] = `http://${serverConf.PROTOCOL}:${serverConf.PORT}`;
}

module.exports = {
    build: {
      env: require('./prod.env'),
      index: path.resolve(__dirname, '../dist/index.html'),
      assetsRoot: path.resolve(__dirname, '../dist'),
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      productionSourceMap: true,
      productionGzip: false,
      productionGzipExtensions: ['js', 'css'],
      bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
      env: require('./dev.env'),
      port: process.env.PORT || 8080,
      autoOpenBrowser: true,
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      proxyTable: proxyTable,
      cssSourceMap: false
    }
  }
  