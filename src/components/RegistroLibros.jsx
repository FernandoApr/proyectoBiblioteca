import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'



const Formulario = (props) => {
    const [nombreLibro, setNombreLibro] = useState('')
    const [nombreAutor, setNombreAutor] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [disponibilidad, setDisponibilidad] = useState(false)
    const [año, setAño] = useState('')
    const [listaLibros, setListaLibros] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [filtro, setFiltro] = useState([])
    const [id, setId] = useState(0)
    const [modoEdicion, setModoEdicion] = useState(false)
    
    
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                await onSnapshot(collection(db, 'libros'), (query) => {
                    setListaLibros(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })

            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos();
    }, [])

    const guardarLibros = async (e) => {
        e.preventDefault()
        try {
            const data = await addDoc(collection(db, 'libros'), {
                nombreLibro: nombreLibro,
                nombreAutor: nombreAutor,
                disponibilidad: disponibilidad,
                descripcion: descripcion,
                año: año
            })

            setListaLibros([...listaLibros, {
                nombreLibro: nombreLibro,
                nombreAutor: nombreAutor,
                id: data.id,

                año: año,
                disponibilidad: disponibilidad,
                descripcion: descripcion
            }])


            setNombreLibro('')
            setNombreAutor('')
            setDescripcion('')
            setDisponibilidad(false)
            setAño('')

        } catch (error) {
            console.log(error)
        }
    }

    const eliminar = async id => {
        try {
            await deleteDoc(doc(db, 'libros', id))
        } catch (error) {
            console.log(error)
        }
    }

    const editar = item => {
        setNombreLibro(item.nombreLibro)
        setNombreAutor(item.nombreAutor)
        setDescripcion(item.descripcion)
        setAño(item.año)
        setDisponibilidad(item.disponibilidad)
        setId(item.id)
        setModoEdicion(true)
    }

    useEffect(() => {
        if (busqueda.length > 2) {
            setFiltro(listaLibros.filter((e) => e.nombreLibro.includes(busqueda)))
        } else {
            setFiltro(listaLibros)
        }
    }, [busqueda, listaLibros])

    const editarLibros = async e => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'libros', id);
            await updateDoc(docRef, {
                nombreLibro: nombreLibro,
                nombreAutor: nombreAutor,
                disponibilidad: disponibilidad,
                descripcion: descripcion,
                año: año
            })
            const nuevoArray = listaLibros.map(
                item => item.id === id ? {
                    id: id, nombreLibro: nombreLibro,
                    nombreAutor: nombreAutor
                } : item
            )

            setListaLibros(nuevoArray)
            setNombreAutor('')
            setNombreLibro('')
            setId('')
            setDisponibilidad(false)
            setDescripcion('')
            setAño('')
            setModoEdicion(false)
        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = () => {
        setModoEdicion(false)
        setNombreLibro('')
        setNombreAutor('')
        setDisponibilidad(false)
        setDescripcion('')
        setAño('')
        setId('')
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>CRUD DE LIBROS</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Listado de Libros</h4>
                    <input type="text"
                        className="form-control mb-2"
                        placeholder='Búsqueda'
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)} />
                    <br /><br />
                    <ul className="list-group">
                        {
                            filtro.map(item => (
                                <li className="list-group-item" key={item.id}>
                                    <span className="lead">{item.nombreLibro}-{item.nombreAutor}-{item.descripcion}-{item.año}-{item.disponibilidad ? "Disponible" : "No disponible"}</span>
                                    <button className="btn btn-danger btn-sm float-end mx-2" onClick={() => eliminar(item.id)}>Eliminar</button>
                                    <button className="btn btn-warning btn-sm float-end" onClick={() => editar(item)}>Editar</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">{modoEdicion ? 'EDITAR LIBROS' : 'AGREGAR LIBROS'}</h4>
                    <form onSubmit={modoEdicion ? editarLibros : guardarLibros}>
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese Nombre del Libro'
                            value={nombreLibro}
                            onChange={(e) => setNombreLibro(e.target.value)} />

                        <input type="text" className="form-control mb-2"
                            placeholder='Ingrese el autor del libro'
                            value={nombreAutor}
                            onChange={(e) => setNombreAutor(e.target.value)} />

                        <input type="number" className="form-control mb-2"
                            placeholder='Ingrese el año del libro'
                            value={año}
                            onChange={(e) => setAño(e.target.value)} />

                        <input type="text" className="form-control mb-2"
                            placeholder='Ingrese la descripción'
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)} />

                        <input type="checkbox" className=" mb-2"
                            checked={disponibilidad}
                            id="disponibilidad"
                            onChange={(e) => setDisponibilidad(e.target.checked)} />
                        <label htmlFor="disponibilidad">
                            Ingrese si el libro se encuentra actualmente disponible</label>
                        <br /><br />
                        {
                            modoEdicion ?
                                (
                                    <>
                                        <button className="btn btn-warning btn-block">Editar</button>
                                        <button className="btn btn-dark btn-block mx-2" onClick={() => cancelar()}>Cancelar</button>
                                    </>

                                )
                                :
                                <button className="btn btn-primary btn-block">Agregar</button>
                        }

                    </form>
                </div>
            </div>

        </div>
    )
}


export default Formulario