import React, { Component } from 'react';
import './App.css';
import Produtos from './components/Produtos';

class App extends Component {

  state = {produtos: []}

  componentDidMount() {
    fetch("https://masson-produtos.glitch.me/getProdutos")
    .then(res => res.json())
    .then((data)=> {
      this.setState({produtos: data})
      console.log(this.state.produtos)
    })
    .catch(console.log);
  }

  render() {
    return (
      <div className="App container">
        <Produtos par1={this.state.produtos} />
      </div>
    );
  }
}

export default App;
