import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarEmpleado() {

    const base_url = "http://localhost:8080/api/empleados";

    let navegacion = useNavigate();

    const {id} = useParams();

    const [empleado, setEmpleado] = useState({
        nombre: '',
        departamento: '',
        salario: ''
    });

    const {nombre, departamento, salario} = empleado;

    useEffect(() => {
        cargarEmpleado();
    }, []);

    const cargarEmpleado = async () => {
        const response = await axios.get(`${base_url}/${id}`);
        setEmpleado(response.data);
    };

    const guardarDato = (e) => {
        setEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        });
    };

    const actualizarEmpleado = async (e) => {
        e.preventDefault();
        

        await axios.put(`${base_url}/${id}`, empleado);
        // Redireccionar a la página principal
        navegacion('/');
    };

  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Editar Empleado</h3>
            <form onSubmit={(e) => actualizarEmpleado(e)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name='nombre' required={true} value={nombre} onChange={(e) => guardarDato(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="departamento" className="form-label">Departamento</label>
                    <input type="text" className="form-control" id="departamento" name='departamento' required={true} value={departamento} onChange={(e) => guardarDato(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="salario" className="form-label">Salario</label>
                    <input type="number" step="any" className="form-control" id="salario" name='salario' required={true} value={salario} onChange={(e) => guardarDato(e)}/>
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-sm me-3">Actualizar</button>
                    <a href='/' className='btn btn-danger btn-sm'>Regresar</a>
                </div>
            </form>
        </div>
    </div>
  )
}
