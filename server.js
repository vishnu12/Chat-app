
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server)

const {addUser,findUser,removeUser,roomData} =require('./controllers/user')

const router=require('./router')
app.use(router)

io.on('connection',(socket)=>{
    socket.on('join',(data)=>{
       const {user}=addUser(socket.id,data.name,data.room)
      
       socket.join(user.room)

       socket.emit('message',({user:'admin',msg:`${user.name} Welcome to room${user.room}`}))
       socket.broadcast.to(user.room).emit('message',({user:'admin',msg:`${user.name} has joined!!!`}))
       io.to(user.room).emit('roomData',{room:user.room,users:roomData(user.room)})
    })

    socket.on('sendMessage',(message)=>{
        const user=findUser(socket.id)
        io.to(user.room).emit('getMessage',{user:user.name,msg:message})
    
    })

    socket.on('disconnect',()=>{
        const user=removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',{user:'admin',msg:`${user.name} has left!!!`})
            io.to(user.room).emit('roomData',{room:user.room,users:roomData(user.room)})
        }
    })

})


// io.on('connection',(socket)=>{
//     socket.on('message',(message)=>{
//         socket.emit('message',message)
//     })

//     socket.on('disconnect',()=>{
//         console.log('disconnected');
//     })
// })



const port=5000
server.listen(port,()=>console.log(`server started at ${port}`))