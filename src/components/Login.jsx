import React from 'react'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [nombre, setNombre] = React.useState('')
    const [apellido, setApellido] = React.useState('')
    const [error, setError] = React.useState(null)
    const [modoRegistro, setModoRegistro] = React.useState(true)

    const navigate = useNavigate()
    //guardar datos
    const guardarDatos = (e) => {
        e.preventDefault()
        //validaciones

        if (!nombre.trim() && modoRegistro) {
            setError('Ingrese su Nombre')
            return
        }
        if (!apellido.trim() && modoRegistro) {
            setError('Ingrese su Apellido')
            return
        }

        if (!email.trim()) {
            setError('Ingrese su Email')
            return
        }
        if (!pass.trim()) {
            setError('Ingrese su Password')
            return
        }
        if (pass.length < 6) {
            setError('La contraseña debe ser mayor a 6 caracteres')
            return
        }

        setError(null)
        if (modoRegistro) {
            registrar()
        } else {
            login()
        }


    }
    //login
    const login = React.useCallback(async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user);
            setEmail('')
            setPass('')
            setError(null)
            navigate('/admin')
        } catch (error) {
            console.log(error.code);
            if (error.code === 'auth/invalid-email') {
                setError('Email no válido')
            }
            if (error.code === 'auth/user-not-found') {
                setError('Usuario no existe')
            }
            if (error.code === 'auth/wrong-password') {
                setError('Contraseña no coincide')
            }
        }
    }, [email, pass])
    //registrar
    const registrar = React.useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user);
            //guardamos user en db
            await db.collection('usuarios').doc(res.user.email).set(
                {
                    email: res.user.email,
                    id: res.user.uid,
                    nombre: nombre,
                    apellido: apellido
                }
            )
            setEmail('')
            setPass('')
            setError(null)
            navigate('/admin')
        } catch (error) {
            console.log(error.code);
            if (error.code === 'auth/invalid-email') {
                setError('Email no válido')
            }
            if (error.code === 'auth/email-already-in-use') {
                setError('Email ya registrado')
            }
        }
    }, [email, pass])
    return (
        <div className="container mt-5">
            <div className='row justify-content-center'>
                <div className='col-12 col-sm-8 col-md-6 col-xl-4'>
                    <div className="card card-login">

                        <div className="card-header">
                            <h3 className='text-center'>
                                {
                                    modoRegistro ? 'Registro de Usuarios' : 'Login'
                                }
                            </h3>
                        </div>

                        <div className="card-body">

                            <form onSubmit={guardarDatos}>
                                {
                                    error && (<div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>)
                                }

                                {
                                    modoRegistro ?
                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombres</label>
                                            <input type="text"
                                                id='nombre'
                                                className='form-control mb-2'
                                                placeholder='Ingrese su Nombre'
                                                onChange={e => setNombre(e.target.value)}
                                            />
                                        </div> :
                                        ''
                                }
                                {
                                    modoRegistro ?
                                        <div className="form-group">
                                            <label htmlFor="apellido">Apellidos</label>
                                            <input type="text"
                                                id='apellido'
                                                className='form-control mb-2'
                                                placeholder='Ingrese su Apellido'
                                                onChange={e => setApellido(e.target.value)}
                                            />
                                        </div>
                                        :
                                        ''
                                }

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email"
                                        id="email"
                                        className='form-control mb-2'
                                        placeholder='Ingrese su Email'
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                        id="password"
                                        className='form-control mb-2'
                                        placeholder='Ingrese su Password'
                                        onChange={e => setPass(e.target.value)}
                                    />
                                </div>


                                <div className='d-grid gap-2'>
                                    <button className='btn btn-outline-dark'>
                                        {
                                            modoRegistro ? 'Registrarse' : 'Acceder'
                                        }
                                    </button>
                                    <button className='btn btn-outline-primary'
                                        onClick={() => { setModoRegistro(!modoRegistro) }}
                                        type='button'>
                                        {
                                            modoRegistro ? '¿Ya estas registrado?' : '¿No tienes cuenta?'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login