import React, { Component }  from 'react'
import FlipCard from 'react-card-flip'
import './Carta.css';


export default class Carta extends Component {
    render() {
      return (
        <div className="carta" onClick={this.props.seleccionarCarta}>
          <FlipCard
            isFlipped={this.props.estaSiendoComparada || this.props.fueAdivinada}
            flipDirection="vertical"
          >
            <div className="portada"></div>
            <div className="contenido">
              <i className={`fa ${this.props.icono} fa-5x`}></i>
            </div>
          </FlipCard>
        </div>
      )
    }  
};