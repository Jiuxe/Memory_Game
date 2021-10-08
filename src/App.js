import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header'
import Tablero from './Tablero/Tablero'
import construirBaraja from './utils/construirBaraja';


let getEstadoInicial = () => {
  let baraja = construirBaraja();
  return {
    baraja,
    parejaSeleccionada: [],
    estaComparando: false,
    numeroDeIntentos: 0    
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getEstadoInicial();
  }

  render() {
    return (
      <div className="App">
        <Header 
          numeroDeIntentos={this.state.numeroDeIntentos}
          resetearPartida={() => this.resetearPartida()}
        />
        <Tablero 
          baraja={this.state.baraja}
          parejaSeleccionada={this.state.parejaSeleccionada}
          seleccionarCarta={(carta) => this.seleccionarCarta(carta)}
        />
      </div>
     <div></div> 
    );
  }

  seleccionarCarta(carta) {
    if (
      this.state.estaComparando ||
      this.state.parejaSeleccionada.indexOf(carta) > -1 ||
      carta.fueAdivinida
    ) {
      return;
    }

    let parejaSeleccionada = [...this.state.parejaSeleccionada, carta];

    this.setState({
      parejaSeleccionada
    });
    

    if (parejaSeleccionada.length === 2) {
      this.compararPareja(parejaSeleccionada);
    }


  }

  compararPareja(parejaSeleccionada) {

    this.setState({estaComparando: true});

    setTimeout(() => {
      let [primeraCarta, segundaCarta] = parejaSeleccionada;
      let baraja = this.state.baraja;

      if (primeraCarta.icono === segundaCarta.icono) {
        baraja = baraja.map((carta) => {
          if (carta.icono !== primeraCarta.icono) {
            return carta;
          }

          return {...carta, fueAdivinada: true};
        });
      }

      this.setState({
        baraja,
        estaComparando: false,
        parejaSeleccionada: [],
        numeroDeIntentos: this.state.numeroDeIntentos + 1
      })
      
      this.verificarSiHayGanador(baraja);
      
    }, 1000)
  }

  verificarSiHayGanador(baraja) {
    if (
      baraja.filter((carta) => !carta.fueAdivinada).length === 0
    ) {
      alert(`Ganaste en ${this.state.numeroDeIntentos} intentos!`);
    }
  }

  resetearPartida() {
    this.setState(
      getEstadoInicial()
    );
  }
}

/*
const getEstadoInicial = () => {
  const baraja = contruirBaraja();
  return{
    baraja,
    parejaSeleccionada: [],
    estaComparando: false
  };
}

function App() {

  let state = getEstadoInicial()

  return (
    <div className="App">
      <Header />
      <Tablero 
        baraja = {state.baraja}
        parejaSeleccionada = {state.parejaSeleccionada}
        seleccionarCarta = {(carta) => seleccionarCarta(carta, state)} 
      />
    </div>
  );
}

function seleccionarCarta(carta, state){
  
  if( state.estaComparando ||
      state.parejaSeleccionada.indexOf(carta) > -1 ||
      carta.fueAdivinada
    ){
      return;
    }

  console.log("carta seleccionada")
  state.parejaSeleccionada = [...state.parejaSeleccionada, carta]
  console.log(state.parejaSeleccionada)

  if (state.parejaSeleccionada.length === 2){
    compararPareja(state)
  }
}

function compararPareja(state){
  state.estaComparando = true;

  setTimeout(() => {
    const [primeraCarta, segundaCarta] = state.parejaSeleccionada;
    let baraja = state.baraja;

    if( primeraCarta.icono === segundaCarta.icono){
      baraja = baraja.map((carta) => {
        if(carta.icono !== primeraCarta.icono){
          return carta;
        }
        console.log("Pareja encontrada")
        carta.fueAdivinada = true
        return {...carta};
      });
    }

    state.parejaSeleccionada = []
    state.baraja = baraja
    state.estaComparando = false

  }, 1000)

}

*/

export default App;
