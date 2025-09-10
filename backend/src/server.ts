import express from "express"
import http from "http"
import { Server } from "socket.io"


const app = express();
const httpServer = http.createServer(app)

const io = new Server(httpServer,{cors:{origin:"http://localhost:3000"}})


io.on("connection",(socket) =>{
    
    socket.on("chatMSG", ({name,room,message})=>{
        io.to(room).emit("chatMSG",name+":"+message)
    })

    socket.on("joinRoom",({room,name})=>{
        socket.join(room)
        io.to(room).emit("chatMSG",name+" connected!")
    })

})


httpServer.listen(3001)