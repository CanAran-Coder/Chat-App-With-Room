import express from "express"
import http from "http"
import { Server } from "socket.io"


const app = express();
const httpServer = http.createServer(app)

const io = new Server(httpServer,{cors:{origin:"http://localhost:3000"}})


io.on("connection",(socket) =>{
    
    socket.on("chatMSG", ({name,room,msg})=>{
        io.to(room).emit("chatMSG",name+":"+msg)
    })

    socket.on("joinRoom",({room,name})=>{
        socket.join(room)
        io.to(room).emit("chatMSG",name+" connected!")
    })

})
