import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function Listado_empleados() {

    const base_url = "http://localhost:8080/api/empleados";

    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        const response = await axios.get(base_url);
        //console.log(response.data);
        setEmpleados(response.data);
    };

    const eliminarEmpleado = async (id) => {
        if(window.confirm('¿Está seguro de eliminar el empleado?')){
            await axios.delete(`${base_url}/${id}`);
            cargarEmpleados();
        }
    }

  return (
    <div className='container'>
        <div className="container text-center" style={{margin: "30px"}}>
            <h3>Sistema de Recursos Humanos</h3>
        </div>
        <table className="table table-striped table-hover aling-middle">
            <thead className='table-dark'>
                <tr>
                <th scope="col">id</th>
                <th scope="col">Empleado</th>
                <th scope="col">Departamento</th>
                <th scope="col">Salario</th>
                <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
                {
                    // Iterando sobre el arreglo de empleados
                    empleados.map((empleado, index) => (
                        <tr key={index}>
                            <th scope="row">{empleado.id}</th>
                            <td>{empleado.nombre}</td>
                            <td>{empleado.departamento}</td>
                            <td>
                                <NumericFormat 
                                value={empleado.salario}
                                displayType={'text'}
                                thousandSeparator=',' 
                                prefix='$' 
                                decimalScale={2} 
                                fixedDecimalScale={true} />
                            </td>
                            <td>
                                <Link to={`/editar/${empleado.id}`} className="btn btn-warning btn-sm me-3">Editar</Link>
                                <button onClick={() => eliminarEmpleado(empleado.id)} className="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    ))
                
                }
            </tbody>
        </table>
    </div>
  )
}
