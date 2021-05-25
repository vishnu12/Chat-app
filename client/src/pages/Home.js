import React,{useEffect,useState,useRef} from 'react'
import { Message } from '../components/Message'
import io from 'socket.io-client'
import { Notify } from '../components/Notify'

export const Home = ({match,location}) => {

    let socket=useRef()

    const [user, setUser] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState([])

    useEffect(()=>{
        socket.current = io(); 
       setUser(match.params.user)
       setRoom(match.params.room)
      
    },[user,room])

    useEffect(()=>{
        if(user && room){
            let data={
                name:user,
                room:room
            }
            socket.current.emit('join',(data))
            socket.current.on('message',msg=>{
                setMessages(messages=>[...messages,msg])
            })

            socket.current.on('roomData',({users})=>{
                setUsers(users)
            })

            socket.current.on('getMessage',({user,msg})=>{
                setChat(chat=>[...chat,{name:user,message:msg}])
            })

        }
    },[user,room])

    
    function handleSubmit(e) {
        e.preventDefault()
         socket.current.emit('sendMessage',message)
         setMessage('')
    }



    return (
        <div className='row'>
            <div className='col-md-8'>
        <div className='home'>
            <div className="message-container">
                <h5 className='text-center'>Welcome {user} to room {room}</h5>
                {
                    chat && chat.map((itm,ind)=>{
                        return <Message key={ind} user={user===itm.name?'You':itm.name} ml={user===itm.name?'auto':'1rem'} mr={user===itm.name?'1rem':'auto'}>{itm.message}</Message>
                    })
                }
                
            </div>
           <form className='d-flex' onSubmit={handleSubmit}>
               <input type="text" value={message} className='form-control' onChange={e=>setMessage(e.target.value)} />
               <button type='submit' className='btn btn-success'>SEND</button>
          </form> 
        </div>
        </div>
        <div className='col-md-4'>
          <Notify messages={messages} />
        </div>
        </div>
    )
}
