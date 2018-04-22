import React from 'react'
import ReactDOM from 'react-dom'
import getData from './data.js'
import classNames from 'classnames'
import Number from './NumberControl.js'
import './style.css'
class Product extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      products : [],
      total : 0
    }
  }

  componentDidMount(){
    this.setState({products : getData()},()=>{
      this.calculateTotal()
    })

  }

  onCheckProduct(idx){
    let products = this.state.products
    products[idx].isChecked = !products[idx].isChecked;
    this.setState({products : products}, ()=>{this.calculateTotal()});
  }

  onChangeQty(val, idx){
    let products = this.state.products
    let prod = products[idx]
    prod.price = (prod.price / prod.quantity) * val
    prod.quantity = val;
    products[idx] = prod;
    this.setState({products : products},()=>{this.calculateTotal()});
  }

  onReset(){
    this.setState({products : getData()},()=>{this.calculateTotal()})
  }

  calculateTotal(){
    let products = this.state.products
    let total = 0
    for(let prod of products)
    {
      if(!prod.isChecked)
        continue;

      total += prod.price
    }
    this.setState({total : total})

  }

  getHeaders(){
    return (
      <tr style={{height : '50px'}}>
        <th style={{width : '30px'}}></th>
        <th style={{width : '300px'}}>Name</th>
        <th style={{width : '100px'}}>Quantity</th>
        <th style={{width : '90px'}}>Price</th>
      </tr>
    )
  }

  getProductRows(){
    return this.state.products.map((prod, idx)=>{
      return(
        <tr key={idx} style={{height : '50px'}} className={classNames({'disable-row' : !prod.isChecked})}>
          <td style={{textAlign : 'center'}}>
            <input type='checkbox' checked={prod.isChecked} onClick={()=>this.onCheckProduct(idx)}/>
          </td>
          <td style={{paddingLeft : '10px'}}>{prod.productName}</td>
          <td style={{textAlign : 'center'}}>
                  <Number
                      value={prod.quantity}
                      min={1}
                      onChange={(val)=>this.onChangeQty(val, idx)}
                      style={{width : '50px', height : '30px', fontSize : '15px'}}/>
          </td>
          <td style={{textAlign : 'center', textDecoration : (!prod.isChecked) ? 'line-through' : 'none'}}>$ {prod.price}</td>
        </tr>
      )
    })
  }

  getTotal(){
    return(
      <tr style={{height : '50px'}}>
        <td colSpan={2} style={{textAlign : 'center'}}>
          <input type='button'
                 value='Reset'
                 style={{width : '200px', height:'40px'}}
                 onClick={()=>this.onReset()}/>
        </td>
        <td style={{textAlign : 'center'}}><b>Total</b></td>
        <td style={{textAlign : 'center'}}><b>$ {this.state.total}</b></td>
      </tr>
    )
  }

  render(){
    return(
      <div className='container'>
      <u><b>Available options</b></u>
        <table>
        <caption style={{textAlign : 'left', padding : '3px'}}>Product Options : </caption>
        <tbody>
          {this.getHeaders()}
          {/*Get list of all the products*/}
          {this.getProductRows()}
          {/*Get total price of all products*/}
          {this.getTotal()}
          </tbody>
        </table>
      </div>
    )
  }
}

ReactDOM.render(<Product/>, document.getElementById('container'));
