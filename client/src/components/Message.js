import React from 'react'

export const Message = ({
    bg='#eff2d8',
    ml,
    mr,
    user,
    children
}) => {
    return (
        <div className='message' style={{backgroundColor:`${bg}`,marginLeft:`${ml}`,marginRight:`${mr}`}}>
        <p style={{fontSize:'15px'}}><strong>{user}</strong></p>
        <div className='msg-child'>
            {children}
        </div>
        </div>
    )
}
