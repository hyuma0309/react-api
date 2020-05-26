import React from 'react'
import EditForm from './EditForm';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
        edit : false
        }
  }

  delete = (id) => {
    this.props.delete(id)
}


handleButton= (id,e) =>{
    e.preventDefault()
    const products = this.props.products;
    products.filter( item => {
    if(item.id === id){
    this.setState({edit: true})
    }});
  }

edit = (id,e) =>{
    e.preventDefault()
    const form = e.target.form
    const title = form.title.value
    const desc = form.desc.value
    const price = form.price.value
    const editProduct = {
        title: title,
        price: price,
        desc: desc
    }
    this.props.edit(id,editProduct)
}


  render() {
    const products = this.props.products
    const list = []
    for (let i = 0; i < products.length; i++) {
        if(products[i].isVisible === true ){
      list.push(
        <li key={i} >
          <span>{products[i].title}</span>
          <span>{products[i].desc}</span>
          <span>{products[i].price}</span>
          <div>
        <button type="submit" onClick={() => this.delete(products[i].id)}>削除</button>
        <button type="submit" onClick = {(e) => this.handleButton(products[i].id , e)}>編集</button>
        </div>


          {this.state.edit &&
          <EditForm
          product = {this.props.products}
          edit = {this.edit}
          id = {products[i].id}
          />
          }
        </li>
      )
    }

    }

    return (
      <div>
        <h1>商品リスト</h1>
        <ul>
          {list}
        </ul>
            <h3>商品件数は{list.length}件です</h3>
      </div>
    )
  }
}