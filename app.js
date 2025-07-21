const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config({path: path.join(__dirname, '.env')})


app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })  
})



app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))