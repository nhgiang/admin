import { enableProdMode } from '@angular/core'

const express = require('express')
const app = express()
enableProdMode()
app.use(express.static('./dist/admin'))

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/admin/' }),
)

app.listen(8080)
