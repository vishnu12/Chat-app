import React from 'react'

export const Notify = ({messages}) => {
    let uniqueMessages=[...new Set(messages)]
    let colorPicker=(msg)=>{
        if(msg.includes('Welcome')){
            return 'blue'
        }else if(msg.includes('left')){
            return 'red'
        }else{
            return 'green'
        }
    }
    return (
        <div className='notify-container'>
            {
                messages?.map(({user,msg},index)=>{
                    return <h5 key={index} className='mt-2'><strong>{user}</strong>: <span style={{color:colorPicker(msg)}}>{msg}</span></h5>
                })
            }
        </div>
    )
}
