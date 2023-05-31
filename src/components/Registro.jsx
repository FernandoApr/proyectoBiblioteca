import React from 'react'
import { db } from '../firebase'

const Registro = (props) => {
  const [lista,setLista]=React.useState([])
  const [nombre,setNombre]=React.useState('')
  const [apellido,setApellido]=React.useState('')
  const [id,setId]=React.useState('')
  const [modoEdicion,setModoEdicion]=React.useState(false)
  const [error,setError]=React.useState(null)
  
  React.useEffect(()=>{
    const obtenerDatos=async()=>{
      try {
        //const db=firebase.firestore()
        const data= await db.collection(props.user.email).get()
        console.log(data.docs)
        const arrayData= data.docs.map(doc=>({id:doc.id,...doc.data()}))
        setLista(arrayData);
        console.log(lista)
      } catch (error) {
        console.error(error);
      }
    }
    obtenerDatos()
  },[])
  //guardar datos
  const guardarDatos=async(e)=>{
    e.preventDefault()
    //validaciones
    if (!nombre.trim()) {
        setError('Ingrese su Nombre')
        return
    }
    if (!apellido.trim()) {
        setError('Ingrese su Apellido')
        return
    }
    //almacenar en firebase
    try {
      //const db=firebase.firestore()
      const nuevoUsuario={nombre,apellido}
      const dato=await db.collection(props.user.email).add(nuevoUsuario)
      //agregar a la lista
    setLista([
      ...lista,
      {...nuevoUsuario,id:dato.id}
  ])
    } catch (error) {
      console.error(error);
    }

    //limpiar estados
    setNombre('')
    setApellido('')
    setError(null)
    
}
//eliminar
const eliminarDato=async(id)=>{
  if (modoEdicion) {
    setError('Esta en modo Edición')
    return
  }
   try {
    //const db=firebase.firestore()
    await db.collection(props.user.email).doc(id).delete()
    const listaFiltrada=lista.filter((elemento)=>elemento.id!==id)
    setLista(listaFiltrada)
  } catch (error) {
    console.log(error)
  }
}
//editar
 
const editar=(item)=>{
  setModoEdicion(true)
  setNombre(item.nombre)
  setApellido(item.apellido)
  setId(item.id)
}
//editardatos
const editarDatos=async(e)=>{
  e.preventDefault()
    //validaciones
    if (!nombre.trim()) {
        setError('Ingrese su Nombre')
        return
    }
    if (!apellido.trim()) {
        setError('Ingrese su Apellido')
        return
    }
    try {
      //const db=firebase.firestore()
      await db.collection(props.user.email).doc(id).update({nombre,apellido})
      const listaEditada=lista.map((elemento)=>elemento.id===id ? {id,nombre,apellido} :elemento)
      setLista(listaEditada)
      setModoEdicion(false)
      setNombre('')
      setApellido('')
      setId('')
      setError(null)

    } catch (error) {
      console.log(error);
    }
}

  return (
    <div className='container'>
      <h1>Crud de Usuarios</h1>
      <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
        {
          error ? (<div className="alert alert-danger" role="alert">
          {error}
        </div>):
        null
        }
        <input type="text" 
        placeholder='Ingrese su Nombre'
        className='form-control mb-3'
        onChange={(e)=>{setNombre(e.target.value.trim())}}
        value={nombre}
        />
        <input type="text" 
        placeholder='Ingrese su Apellido'
        className='form-control mb-3'
        onChange={(e)=>{setApellido(e.target.value.trim())}}
        value={apellido}
        />
        <div className='d-grid gap-2'>
          {
          modoEdicion ? <button type='submit' className='btn btn-success'>Editar</button> :
          <button type='submit' className='btn btn-info'>Registrar</button>
          }
        </div>
      </form>
      <ul className='list-group mt-3'>
        {
          lista.map((item)=>(
            <li className='list-group-item' key={item.id}>
              {item.nombre} {item.apellido}
              <button className='btn btn-danger float-end me-2'
              onClick={()=>eliminarDato(item.id)}
              >Eliminar</button>
              <button className='btn btn-warning float-end me-2'
              onClick={()=>editar(item)}
              >Editar</button>
              </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Registro