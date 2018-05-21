import path from 'path'
import fs from 'fs'
import express from 'express'

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const historyApiFallback = require('connect-history-api-fallback')
const config = require('../webpack.development.config.js')
const compiler = webpack(config)

const port = 3004
const app = express()

app.use((req, res, next) => {
  console.log(new Date(), req.method, req.url, req.query)
  next()
})

app.use(historyApiFallback({
  verbose: false
}))
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
})
app.use(devMiddleware)
app.use(webpackHotMiddleware(compiler))

app.use(express.static('../dist'))
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
})

// app.get('*', (req, res) => {
//   res.write(fs.readFileSync(path.resolve(__dirname, '../dist', 'index.html')))
//   res.end()
// })

// app.get('*', (req, res) => {
//   res.write(devMiddleware.fileSystem.readFileSync(path.resolve(__dirname, '../dist', 'index.html')))
//   res.end()
// })

app.listen(port, error => {
  if (error) {
    console.log(error)
  }
  console.info('==> 🐸 Listening on port %s.', port)
})

