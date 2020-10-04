const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()

app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 3000


const router = require('./routes/index')

app.use('/api', router)



// run server 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))