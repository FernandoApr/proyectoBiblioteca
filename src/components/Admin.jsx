import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Registro from './Registro'

const Admin = () => {
    const navigate=useNavigate()
    const [user,setUser]=React.useState(null)
    React.useEffect(()=>{
        if (auth.currentUser) {
            setUser(auth.currentUser)
            console.log(auth.currentUser);
        } else {
            console.log('No hay un usuario logueado');
            navigate('/login')
        }
    },[navigate])
  return (
    <div>
        {
            user && (<h3>{user.email}</h3>)
        }
        {
            user && (
            <Registro user={user}/>
            )
        }
    </div>
  )
}

export default Admin