import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const MantenimientoGrid = () => {
  const navigate = useNavigate();
  const urlBase = 'http://localhost:4000/api/mantenimiento';
  const [data, setData] = useState([]);
  const [contador , setContador] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlBase);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [ contador ]);

  function handlerLoadForm(id) {
    const url = `/mantenimiento_form/${id}`;
    navigate(url);
  }
  const handleDelete = async (id) => {
    const url = `${urlBase}/${id}`;
    await axios.delete(url);
    setContador(contador + 1);
  }

  return (
    <>
      <div className='container-fluid mt-5'>
        <div className='d-flex justify-content-center align-items-center' style={{maxHeight: `100vh`}}>

          <div className="card text-white bg-dark w-100">
            <div className="card-header text-center d-flex bd-highlight">

              <div className='w-100 bd-highlight'>
                <h3>Mantenimiento</h3>
              </div> 
              <div className='flex-shrink-1 bd-highlight'>
                <button className='btn btn-success' onClick={() => handlerLoadForm(0)} title='Nuevo Registro'><i className="bi bi-plus-square-fill"></i></button>
              </div>

            </div>
            <div className="card-body">

              <table className="table table-dark table-striped table-hover">
                <thead>
                  <tr>
                    <th className='col-1 align-middle text-center'>ID</th>
                    <th className='col-2 align-middle text-center'>Vehiculo</th>
                    <th className='col-1 align-middle text-center'>Kms</th>
                    <th className='col-1 align-middle text-center'>Fecha</th>
                    <th className='col-2 align-middle text-center'>Diagnostico</th>
                    <th className='col-3 align-middle text-center'>Servicio</th>
                    <th className='col-2 align-middle text-center'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className='col-1 align-middle text-center'>{item.id}</td>
                      <td className='col-2 align-middle'>{item.vehiculo}</td>
                      <td className='col-1 align-middle'>{item.kilometraje}</td>
                      <td className='col-1 align-middle'>{moment(item.fecha === null ? "2024-01-01" : item.fecha).format('YYYY-MM-DD')}</td>
                      <td className='col-2 align-middle'>{item.diagnostico}</td>
                      <td className='col-3 align-middle'>{item.servicio}</td>
                      <td className='col-2 text-center'>
                        <button className='me-1 btn btn-info' onClick={() => handlerLoadForm(item.id)} title='Editar Registro'><i className="bi bi-pencil-square"></i></button>
                        <button className='ms-1 btn btn-danger' onClick={() => handleDelete(item.id)} title='Eliminar Registro'><i className="bi bi-trash3-fill"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}