import React,{useState} from 'react'

export const Login = ({history}) => {

    const [user, setUser] = useState('')
    const [room, setRoom] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        if(!user || !room){
            alert('Please enter all fields')
        }else{
            history.push(`/${user}/${room}`)
        }
    }


    return (
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" onChange={e=>setUser(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Room</label>
                    <input type="number" className="form-control" id="exampleInputPassword1" min='1' max='3' onChange={e=>setRoom(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
