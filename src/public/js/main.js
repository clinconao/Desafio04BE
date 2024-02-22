const socket = io()

socket.emit('movimiento', "Ca7")

socket.emit('rendirse', "Me rindo")

socket.on('mensaje-jugador', info =>{
    console.log(info)
})

socket.on('rendicion', info =>{
    console.log(info)
})

