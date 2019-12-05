import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class Produtos extends Component {
  render() {
    return (<div>
                <div className="jumbotron">
                    <h1>Lista de Produtos</h1>
                </div> 
                <div className="row">

        {this.props.par1.map((produto) => (
        <div key={produto.id} className="card mr-auto" style={{width: '18rem'}}>
        <img className="card-img-top" style={{padding: "10px"}} src={produto.foto_url} alt={produto.nome} />
          <div className="card-body">
            <h5 className="card-title">{produto.nome}</h5>
            <p className="card-text"><NumberFormat value = {produto.preco}
                                                   displayType='text'
                                                   prefix='R$ '
                                                   thousandSeparator={'.'}
                                                   decimalSeparator={','}
                                                   fixedDecimalScale={true}
                                                   decimalScale={2} 
                                     /> 
            </p>
          </div>
      </div>))}
        </div>
        </div>
      )
    }
}
export default Produtos;
