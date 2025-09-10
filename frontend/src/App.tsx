import React, { useEffect, useState } from 'react';
import './App.css';
import { Socket ,io} from "socket.io-client"

const socket:Socket = io("http://localhost:3001")
  



function App() {
  const [name, setName] = useState<string>("")
  const [room, setRoom] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [messages , setMessages] = useState<string[]>([])

  useEffect(()=>{

    socket.on("chatMSG",(message:string)=>{
      setMessages(prev => [...prev ,message])
    })

    return ()=>{
      socket.off("chatMSG")
    }

  },[])
  
  function handleJoin(){
    socket.emit("joinRoom", ({room,name}))
  }

  function handleSend(){
    socket.emit("chatMSG",{room,name,message})
  }

  return (
    <div className="App">
      <div className='messagesContainer'>
        {
          messages.map((item,index)=>{
            return <p key={index}>{item}</p>
          })
        }
      </div>
      <label>Name</label>
      <input value={name} onChange={(e)=> setName(e.target.value)}></input>
      <label>Room</label>
      <input value={room} onChange={(e)=> setRoom(e.target.value)}></input>
      <label>Message</label>
      <input value={message} onChange={(e)=> setMessage(e.target.value)}></input>
      <button onClick={handleJoin}>Join Room</button>
      <button onClick={handleSend}>Send Message</button>
    </div>
  );
}

export default App;
