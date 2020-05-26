import React from 'react';
import ProductForm from '../components/ProductForm';
import ProductItem from '../components/EditForm';
import ProductList from '../components/ProductList';
import SearchForm from '../components/SearchForm';


export default class ProductContainer extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        products: [],
      }
    }
      add = (title, desc, price) => {
      const newProducts = this.state.products
      const product = {
        id: this.state.products.length + 1,
        title: title,
        desc: desc,
        price: price,
        isVisible: true
      }
      newProducts.push(product)
      this.setState({products: newProducts})
    }

    delete =(id)=> {
        const products = this.state.products;
        //削除したい配列を取得
        const deleteIndex = products.findIndex( product => product.id === id ) ;
        //配列を一つ削除
        products.splice(deleteIndex,1)
        this.setState({products: products})
      }



      edit = (id, editProduct) =>{
        const products = this.state.products.slice();
        //編集したい配列を取得
        const editIndex = products.findIndex( product => product.id === id ) ;
        const product = {
          title: editProduct.title,
          desc: editProduct.desc,
          price: editProduct.price,
        }
        //上書きしたい要素に新しい要素を再代入
        products[editIndex] = product
        this.setState({products: products})
        console.log(products);
      }



    search = (word) =>{
    const newProducts = this.state.products
    newProducts.forEach(value =>{
        value.title.includes(word)
    if(value.title.includes(word)){
    value.isVisible = true
    }else{
    value.isVisible = false
    }
    })
    this.setState({products: newProducts});
    };


    render() {

  return (
    <div>
        <ProductForm add={this.add} />
        <ProductList
        products={this.state.products}
        delete = {this.delete}
        edit = {this.edit}
        />
        <SearchForm search={this.search} />
    </div>


  )
  }
}

