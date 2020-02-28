import React, {useState, useEffect} from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {


  // Gastos en local storage
  let gastosIniciales = JSON.parse(localStorage.getItem('gastos'));
  let estadoPregunta;
  if(!gastosIniciales){
    gastosIniciales = [];
    // console.log(gastosIniciales);
  }else if(gastosIniciales.length === 0){
    estadoPregunta = true;
  }else{
    estadoPregunta = false;
    // console.log(gastosIniciales);
  }
  

  //definir el state
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarpregunta, actualizarPregunta] = useState(estadoPregunta);
  const [gastos, guardarGastos] = useState(gastosIniciales);
  const [gasto, guardarGasto] = useState({});
  const [creargasto, guardarCrearGasto] = useState(false);



  // useEffect que actualiza el restante

  useEffect(() => {

      // agregar gastos al localstorage
      let gastosIniciales = JSON.parse(localStorage.getItem('gastos'));
      if(gastosIniciales){
        localStorage.setItem('gastos', JSON.stringify(gastos));
      }else{
        localStorage.setItem('gastos', JSON.stringify([]));
      }

      if(creargasto){

        // agrega el nuevo presupuesto
        guardarGastos([
          ...gastos,
          gasto
        ]);

        // resta del presupuesto actual
        const presupuestoRestante = restante - gasto.cantidad;
        guardarRestante(presupuestoRestante);

        // Resetear a false
        guardarCrearGasto(false);
      }
  }, [gasto, creargasto, gastos, restante])

  // funcion elimina el gasto

  const eliminarGasto = (id, cantidad) => {
    const nuevosGastos = gastos.filter(gasto => gasto.id !== id);
    const presupuestoNuevo = restante + cantidad ;
    console.log(presupuestoNuevo);
    // console.log(nuevosGastos);
    guardarGastos(nuevosGastos);
    guardarRestante(presupuestoNuevo);

    // let gastosIniciales = JSON.parse(localStorage.getItem('gastos'));
    // console.log(gastosIniciales);
    // if(gastosIniciales){
    //   localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
    // }else{
    //   localStorage.setItem('gastos', JSON.stringify([]));
    //   actualizarPregunta(true);
    // }
    
  }


  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>

        <div className="contenido-principal contenido">
          {mostrarpregunta ? 
            (
              <Pregunta 
                guardarPresupuesto = {guardarPresupuesto}
                guardarRestante={guardarRestante}
                actualizarPregunta={actualizarPregunta}
              />
            ) : 
            (
              <div className="row">
                <div className="one-half column">
                  <Formulario
                    guardarGasto={guardarGasto}
                    guardarCrearGasto={guardarCrearGasto}
                  />
                </div>
                <div className="one-half column">
                  <Listado 
                    gastos={gastos}
                    eliminarGasto={eliminarGasto}
                  />

                  <ControlPresupuesto
                    presupuesto={presupuesto}
                    restante={restante}
                  />
                </div>
              </div>
            )
          }
        </div>
      </header>
    </div>
  );
}

export default App;
