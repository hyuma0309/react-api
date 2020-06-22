import React from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import SearchForm from '../components/SearchForm';
import productApi from '../api/ProductApi'



export default class ProductContainer extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        apiToken: '',
        products: []
           }
    }

    componentDidMount() {
      const apiToken = window.localStorage.getItem('apiToken');
      this.setState({apiToken: apiToken});
  }

  /**
     * apiTokenの変更をstateに反映させます
     * @param e
     */
    handleInputChange = e => {
      this.setState({apiToken: e.target.value})
  };

  /**
     * 商品情報一覧を取得します
     * @param e
     */
    fetchData = async (e) => {
      const apiToken = this.state.apiToken;
      const products = await productApi.fetchAll(apiToken);
      console.log(products)
      this.setState({
        products: products
    });
      window.localStorage.setItem('apiToken', apiToken);
    }



    //商品の追加
      add = async (title, desc, price) => {
      const apiToken = this.state.apiToken;
      await productApi.add(title, desc, price, apiToken);

      const newProducts = this.state.products.slice()
      const product = {
        id: newProducts.length + 1,
        title: title,
        desc: desc,
        price: price,
        isVisible: true,
        editIsVisible: false
           }
      newProducts.push(product)
      this.setState({products: newProducts})

    }

　 //商品の削除
    delete =(id)=> {
        const products = this.state.products;
        //削除したい配列を取得
        const deleteIndex = products.findIndex( product => product.id === id ) ;
        //配列を一つ削除
        products.splice(deleteIndex,1)
        this.setState({products: products})
      }

      //編集フォームの表示
      editForm = (id) => {
        const products = this.state.products;
        const formIndex = products.findIndex( product => product.id === id );
        products[formIndex].editIsVisible = true
        this.setState({products: products})
      }


      //商品の編集
      edit = (id, editProduct) =>{
        const products = this.state.products;
        //編集したい配列を取得
        const editIndex = products.findIndex( product => product.id === id ) ;
        const product = {
          id: id,
          title: editProduct.title,
          desc: editProduct.desc,
          price: editProduct.price,
          isVisible: true
        }
        //上書きしたい要素に新しい要素を再代入
        products[editIndex] = product
        this.setState({products: products})
      }

      //画像の追加
      file = (id, imagePreviewUrl) => {
        const products = this.state.products.slice();
        const fileIndex = products.findIndex( product => product.id === id ) ;
        products[fileIndex]= { ...products[fileIndex], imagePreviewUrl}
        this.setState({products: products})
      }


  //商品の検索
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
          <form>
          <h1>APIトークン</h1>
          <input type="text" id="api" placeholder="トークンを入れてください" onChange={this.handleInputChange} />
          <button type="submit" id="valid" onClick={this.fetchData}>商品情報を取得</button>
          </form>


        <ProductForm add={this.add} />
        <ProductList
        products={this.state.products}
        delete = {this.delete}
        edit = {this.edit}
        editForm = {this.editForm}
        file = {this.file}
        />
        <SearchForm search={this.search} />
    </div>


  )
  }
}

