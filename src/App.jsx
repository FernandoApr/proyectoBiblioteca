import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Inicio from './components/Inicio'
import Login from './components/Login'
import Admin from './components/Admin'
import Navbar from './components/Navbar'
import React from 'react'
import { auth, db } from './firebase'
import { collection, query, where, getDocs } from "firebase/firestore";


function App() {
  const [firebaseUser, setFirebaseUser] = React.useState({})
  const [tipo, setTipo] = React.useState('')
  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setFirebaseUser(user)

        const consultarUsuario = async (email) => {

          const q = query(collection(db, "usuarios"), where("email", "==", email));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {

            const data = doc.data()
            setTipo(doc.data().tipo)
          });

        }

        consultarUsuario(user.email)
      } else {
        setFirebaseUser(null)
      }
    })


  }, [])



  return firebaseUser !== false ? (
    <Router>
      <div className='container'>
        <Navbar firebaseUser={firebaseUser} otroProp={tipo} />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='login' element={<Login />} />
          <Route path='admin' element={<Admin />} />
        </Routes>
      </div>
    </Router>
  ) :
    (<p>Loading...</p>)
}

export default App
