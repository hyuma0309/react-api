import React from 'react'
import EditForm from './EditForm';

export default class ProductList extends React.Component {


  delete = (id) => {
    this.props.delete(id)
}

handleFileChange = (id,e) => {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      this.props.file(id,  reader.result);
    }
    reader.readAsDataURL(file)
  }


handleButton= (id,e) =>{
    e.preventDefault()
    this.props.editForm(id)
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
const product =  this.props.products.map((product) => {
        if (product.isVisible === true ){
            return(
          <ul key={product.id}>
          <li>{product.title}</li>
          <li>{product.desc}</li>
          <li>{product.price}円</li>
        <div>
        <button type="submit" onClick={() => this.delete(product.id)}>削除</button>
        <button type="submit" onClick = {(e) => this.handleButton(product.id , e)}>編集</button>
        </div>

        <div>
        <input type="file" onChange={(e) => this.handleFileChange(product.id, e)}/>
        <img src={product.imagePreviewUrl} />
        </div>

          {product.editIsVisible &&
          <EditForm
          product = {this.props.products}
          edit = {this.edit}
          id = {product.id}
          />}
          </ul>
            )
        }
    });
    const searchItem = this.props.products.filter( function( value ) {
       return value.isVisible === true
  })


    return (
      <div>
        <h1>商品リスト</h1>
        {product}
        <h3>商品件数は{searchItem.length}件です</h3>
      </div>
    )
  }
}