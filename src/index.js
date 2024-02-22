import express from "express"
import cartRouter from "./routes/cartRouter.js"
import productsRouter from "./routes/productsRouter.js"
import upload from "./config/multer.js"

import { Server } from "socket.io"
import { __dirname } from './path.js'
import { CartManager } from "./config/cartManager.js"
import { engine } from "express-handlebars"

const app = express()
const PORT = 8080

// por acá el server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server)

// middlewares
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

io.on('conection', (socket) => {
    console.log("Conexion con Socket.io")

    socket.on('movimiento', info => {
        //cliente envía un msje.
        console.log(info)
    })


    socket.on('rendirse', info => {
        //cliente envía un msje.
        console.log(info)
        socket.emit('mensaje-jugador', "Te has echao")
        socket.broadcast.emit('rendicion', "El jugador se fue hace rato")
    })
})

// por acá routes
app.use('/public', express.static(__dirname + '/public'))

app.use('/api/products', productsRouter, express.static(__dirname+'/public'))
app.use(`/api/carts`, cartRouter)
app.post('/upload',upload.single('product'), (req, res) => {

    try {
        console.log(req.file)
        res.status(200).send("Imagen cargada")
    } catch (error) {
        res.status(500).send("Hay un error al cargar imagen")
    }
    
} )

app.get('/static', (req, res) =>{

    const prods = [
        {id: 1, title:"Mouse", price:12020, img:""},
        {id: 2, title:"Teclado", price:12400},
        {id: 3, title:"Album", price:100},
        {id: 4, title:"Cables", price:12300}

    ]
    res.render('templates/products',{
        mostrarProductos: true,
        productos: prods,
        css: 'home.css'
    })
})