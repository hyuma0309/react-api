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
      response: '',
    };
  }

  componentDidMount() {
    const apiToken = window.localStorage.getItem('apiToken');
    this.setState({ apiToken: apiToken });
  }

  /**
   * apiTokenの変更をstateに反映
   * @param e イベントオブジェクト
   */
  handleInputChange = e => {
    this.setState({ apiToken: e.target.value });
  };

  /**
   *ネットワークエラー
   * @param e イベントオブジェクト
   */
  getErrorResponse = e => {
    if (!e.response) {
      alert('ネットワークエラーが発生しました！');
    } else if (e.response.status === 400) {
      alert(e.response.data.detail);
    } else if (e.response.status === 401) {
      alert(e.response.data.detail);
    } else if (e.response.status === 500) {
      alert(e.response.data.detail);
    } else {
      alert('エラーが発生しました！');
    }
  };

  /**
   * トークンで認証
   * @param e イベントオブジェクト
   */
  authentication = async e => {
    try {
      e.preventDefault();
      const apiToken = this.state.apiToken;
      const response = await productApi.login(apiToken);
      this.setState({
        products: response.data,
      });
      this.setState({ message: '認証に成功しました' });
      window.localStorage.setItem('apiToken', apiToken);
    } catch (e) {
      this.getErrorResponse(e);
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
      this.getErrorResponse(e);
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
      this.getErrorResponse(e);
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
        imagePath: products[editIndex].imagePath,
        isVisible: true,
      };
       //base64に変換された画像
        const image = await productApi.getImage(product.id, product.imagePath, apiToken);
        product.image = image;

        //上書きしたい要素に新しい要素を再代入
      products[editIndex] = product;
      await productApi.update(id, editProduct, apiToken);
      this.setState({ products: products });
    } catch (e) {
      this.getErrorResponse(e);
    }
  };

  //画像の追加
  file = async (id, data) => {
    const apiToken = this.state.apiToken;
    const products = this.state.products.slice();
    try {
      //画像のアップロード
      const response = await productApi.image(id, data, apiToken);
      const image = await productApi.getImage(
        response.data.id,
        response.data.imagePath,
        this.state.apiToken
      );
      const imagePath = response.data.imagePath
      const fileIndex = products.findIndex(product => product.id === id);
      products[fileIndex] = { ...products[fileIndex], image };
      products[fileIndex] = { ...products[fileIndex], imagePath };
      this.setState({ products: products });
    } catch (e) {
      this.getErrorResponse(e);
    }
  };

  //商品の検索
  search = async word => {
    const newProducts = this.state.products;
    const apiToken = this.state.apiToken;
    await Promise.all(
      newProducts.map(async product => {
        product.title.includes(word);
        if (product.title.includes(word)) {
          product.isVisible = true;
        } else {
          product.isVisible = false;
        }
        //base64に変換された画像
        if(product.imagePath){
        const image = await productApi.getImage(product.id, product.imagePath, apiToken);
        product.image = image;
        }
      })
    );
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
