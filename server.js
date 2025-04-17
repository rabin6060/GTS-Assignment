const express = require('express')
const cors = require('cors')
const productRoute = require('./routes/product.routes')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/api/products',productRoute)

app.listen(port,()=>{
    console.log(`server running at port ${port} `)
})