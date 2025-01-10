const express = require('express')

const app = express()

const conn = require('./db/conn')

const cors = require('cors')


app.use(cors());

const usersRoutes = require('./routes/usersRoutes')

const foodsRoutes = require('./routes/foodsRoutes');

const ordersRoutes = require('./routes/ordersRoutes');




require('dotenv/config')

const api = process.env.API_URL

const bodyParser = require('body-parser')

const morgan = require('morgan')


app.use(bodyParser.json());
app.use(morgan('tiny'))

//routers

app.use(`${api}/users`, usersRoutes)
app.use(`${api}/foods`, foodsRoutes)
app.use(`${api}/orders`, ordersRoutes)


app.listen(3004, () => {
   
    console.log('server is running 3004')
})