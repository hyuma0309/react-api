import React from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import SearchForm from '../components/SearchForm';

export default class ProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  //商品の追加
  add = (title, desc, price) => {
    const newProducts = this.state.products.slice();
    const product = {
      id: newProducts.length + 1,
      title: title,
      desc: desc,
      price: price,
      isVisible: true,
      editIsVisible: false,
    };
    newProducts.push(product);
    this.setState({ products: newProducts });
  }; //商品の削除

  delete = id => {
    const products = this.state.products;
    //削除したい配列を取得
    const deleteIndex = products.findIndex(product => product.id === id);
    //配列を一つ削除
    products.splice(deleteIndex, 1);
    this.setState({ products: products });
  };

  //編集フォームの表示
  editForm = id => {
    const products = this.state.products;
    const formIndex = products.findIndex(product => product.id === id);
    products[formIndex].editIsVisible = true;
    this.setState({ products: products });
  };

  //商品の編集
  edit = (id, editProduct) => {
    const products = this.state.products;
    //編集したい配列を取得
    const editIndex = products.findIndex(product => product.id === id);
    const product = {
      id: id,
      title: editProduct.title,
      desc: editProduct.desc,
      price: editProduct.price,
      isVisible: true,
    };
    //上書きしたい要素に新しい要素を再代入
    products[editIndex] = product;
    this.setState({ products: products });
  };

  //画像の追加
  file = (id, imagePreviewUrl) => {
    const products = this.state.products.slice();
    const fileIndex = products.findIndex(product => product.id === id);
    products[fileIndex] = { ...products[fileIndex], imagePreviewUrl };
    this.setState({ products: products });
  };

  //商品の検索
  search = word => {
    const newProducts = this.state.products;
    newProducts.forEach(value => {
      value.title.includes(word);
      if (value.title.includes(word)) {
        value.isVisible = true;
      } else {
        value.isVisible = false;
      }
    });
    this.setState({ products: newProducts });
  };

  render() {
    return (
      <div>
        <ProductForm add={this.add} />
        <ProductList
          products={this.state.products}
          delete={this.delete}
          edit={this.edit}
          editForm={this.editForm}
          file={this.file}
        />
        <SearchForm search={this.search} />
      </div>
    );
  }
}
