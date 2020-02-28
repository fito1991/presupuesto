import React from 'react'
import PropTypes from 'prop-types';


const Gasto = ({gasto, eliminarGasto}) => {
    return ( 
        <li className="gastos">
            <p>
                {gasto.nombre}
                <span className="gasto">$ {gasto.cantidad}</span>
                <button
                    className="button alert-danger"
                    onClick={ () => eliminarGasto(gasto.id, gasto.cantidad)}
                >X</button>
            </p>
        </li>
    );
}

Gasto.propTypes = {
    gasto: PropTypes.object.isRequired
}
 
export default Gasto;