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
      message: '',
      products: [],
    };
  }

  componentDidMount() {
    const apiToken = window.localStorage.getItem('apiToken');
    this.setState({ apiToken: apiToken });
  }

  /**
   * apiTokenの変更をstateに反映
   * @param e
   */
  handleInputChange = e => {
    this.setState({ apiToken: e.target.value });
  };

  /**
   *ネットワークエラー
   * @param e
   */
  undefindError = e => {
    if (!e.response) {
      alert('ネットワークエラーが発生しました！');
    }
  };

  /**
   * トークンで認証
   * @param e
   */
  authentication = async e => {
    try {
      e.preventDefault();
      const apiToken = this.state.apiToken;
      const products = await productApi.login(apiToken);
      this.setState({
        products: products.data,
      });
      this.setState({ message: '認証に成功しました' });
      window.localStorage.setItem('apiToken', apiToken);
    } catch (e) {
      this.undefindError(e);
      if (e.response.status === 401) {
        alert(e.response.data.detail);
      }
    }
  };

  //商品の追加
  add = async (title, description, price) => {
    const apiToken = this.state.apiToken;
    const newProducts = this.state.products.slice();
    try {
      const response = await productApi.add(title, description, price, apiToken);
      const product = {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        price: response.data.price,
        isVisible: true,
      };
      newProducts.push(product);
      this.setState({ products: newProducts });
    } catch (e) {
      this.undefindError(e);
      if (e.response.status === 400) {
        alert(e.response.data.detail);
      } else if (e.response.status === 401) {
        alert(e.response.data.detail);
      } else if (e.response.status === 500) {
        alert(e.response.data.detail);
      }
    }
  };

  //商品の削除
  delete = async id => {
    const apiToken = this.state.apiToken;
    const products = this.state.products;
    try {
      //削除したい配列を取得
      const deleteIndex = products.findIndex(product => product.id === id);
      //配列を一つ削除
      this.state.products.splice(deleteIndex, 1);
      await productApi.delete(id, apiToken);
      this.setState({ products: products });
    } catch (e) {
      this.undefindError(e);
      if (e.response.status === 401) {
        alert(e.response.data.detail);
      } else if (e.response.status === 500) {
        alert(e.response.data.detail);
      }
    }
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
    try {
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
      await productApi.update(id, editProduct, apiToken);
      this.setState({ products: products });
    } catch (e) {
      this.undefindError(e);
      if (e.response.status === 400) {
        alert(e.response.data.detail);
      } else if (e.response.status === 401) {
        alert(e.response.data.detail);
      } else if (e.response.status === 500) {
        alert(e.response.data.detail);
      }
    }
  };

  //画像の追加
  file = async (id, imagePath) => {
    try {
      const apiToken = this.state.apiToken;
      const products = this.state.products.slice();
      await productApi.image(id, imagePath, apiToken);
      const fileIndex = products.findIndex(product => product.id === id);
      products[fileIndex] = { ...products[fileIndex], imagePath };
      this.setState({ products: products });
      console.log(products);
    } catch (e) {
      this.undefindError(e);
      if (e.response.status === 401) {
        alert(e.response.data.detail);
      } else if (e.response.status === 500) {
        alert(e.response.data.detail);
      }
    }
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
          <button type="submit" onClick={this.authentication}>
            Tokenを取得
          </button>
        </form>
        <p>{this.state.message}</p>
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
