import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Listado_empleados from './empleados/Listado_empleados';
import Navegacion from './layout/Navegacion';
import AgregarEmpleado from './empleados/AgregarEmpleado';
import EditarEmpleado from './empleados/EditarEmpleado';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
      <Navegacion />
      <Routes>
        <Route exact path='/' element={<Listado_empleados />} />
        <Route exact path='/agregar' element={<AgregarEmpleado />} />
        <Route exact path='/editar/:id' element={<EditarEmpleado />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
