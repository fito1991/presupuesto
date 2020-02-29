import React, {useState, useEffect} from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {


  // Gastos en local storage
  let gastosIniciales = JSON.parse(localStorage.getItem('gastos'));
  let estadoPregunta = true;
  if(!gastosIniciales){
    gastosIniciales = [];
    // console.log(gastosIniciales);
  }else if(gastosIniciales.length === 0){
    estadoPregunta = true;
  }else{
    estadoPregunta = false;
    // console.log(gastosIniciales);
  }

  // Presupuesto en el local storage
  let presupuestoInicial = JSON.parse(localStorage.getItem('presupuesto'));
  if(!presupuestoInicial){
    presupuestoInicial = 0;
  }

  //Restante en el local storage
  let restanteInicial = JSON.parse(localStorage.getItem('restante'));
  if(!restanteInicial){
    restanteInicial = 0;
  }
  

  //definir el state
  const [presupuesto, guardarPresupuesto] = useState(presupuestoInicial);
  const [restante, guardarRestante] = useState(restanteInicial);
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

      // agregar presupuesto al localstorage
      let presupuestoInicial = JSON.parse(localStorage.getItem('presupuesto'));
      if(presupuestoInicial){
        localStorage.setItem('presupuesto', JSON.stringify(presupuesto));
      }else{
        localStorage.setItem('presupuesto', JSON.stringify([]));
      }

      // agregar restante al localstorage
      let restanteInicial = JSON.parse(localStorage.getItem('restante'));
      if (restanteInicial) {
        localStorage.setItem('restante', JSON.stringify(restante));
      } else {
        localStorage.setItem('restante', JSON.stringify([]));
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
  }, [gasto, creargasto, gastos, restante, presupuesto])

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
