import React from 'react';
import productApi from '../api/ProductApi';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import SearchForm from '../components/SearchForm';

export default class ProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiToken: '',
      products: []
    };
  }

  componentDidMount() {
        const apiToken = window.localStorage.getItem('apiToken');
        this.setState({apiToken: apiToken});
    }


  /**
   * apiTokenの変更をstateに反映
   * @param e
   */
  handleInputChange = e => {
    this.setState({ apiToken: e.target.value });
  };


  /**
   * 商品情報一覧を取得
   * @param e
   */
  fetchData = async e => {
    e.preventDefault();
    const apiToken = this.state.apiToken;
    const products = await productApi.fetchAll(apiToken);
    this.setState({
      products: products.data
    });
    window.localStorage.setItem('apiToken', apiToken);
  };

  //商品の追加
  add =  async (title, description, price) => {
    const apiToken = this.state.apiToken;
    const promise = await productApi.add(title, description, price, apiToken);
    this.state.products.push(promise.data);
    console.log(this.state.products);
  };

  //商品の削除
  delete = async (id) => {
    const apiToken = this.state.apiToken;
    const products = this.state.products;
     //削除したい配列を取得
    const deleteIndex = products.findIndex(product => product.id === id);
    //配列を一つ削除
    this.state.products.splice(deleteIndex, 1);
    await productApi.delete(id, apiToken);
  };

  //編集フォームの表示
  editForm = id => {
    const products = this.state.products;
    const formIndex = products.findIndex(product => product.id === id);
    products[formIndex].editIsVisible = true;
    this.setState({ products: products });
  };

  //商品の編集
  edit = async (id, editProduct) => {
    const apiToken = this.state.apiToken;
    const products = this.state.products;
    //編集したい配列を取得
    const editIndex = products.findIndex(product => product.id === id);
    const product = {
      id: id,
      title: editProduct.title,
      description: editProduct.description,
      price: editProduct.price,
      isVisible: true,
    };
    //上書きしたい要素に新しい要素を再代入
    products[editIndex] = product;
    await productApi.update(id,editProduct, apiToken);
    };

  //画像の追加
  file = async (id, productImage) => {
    const apiToken = this.state.apiToken;
    const products = this.state.products.slice();
    const fileIndex = products.findIndex(product => product.id === id);
    products[fileIndex] = { ...products[fileIndex], productImage };
    console.log(products)
    await productApi.image(id,productImage, apiToken);
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
        <form>
          <h1>APIトークン</h1>
          <input
            type="text"
            placeholder="トークンを入れてください"
            onChange={this.handleInputChange}
          />
          <button type="submit" onClick={this.fetchData}>
            Tokenを取得
          </button>
        </form>

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
