import React from 'react';
import productApi from '../api/ProductApi';
import EditForm from './EditForm';

export default class ProductList extends React.Component {
  //商品の削除
  delete = id => {
    this.props.delete(id);
  };

  //画像ファイルの読み取り
  handleFileChange = (id, imagePath, e) => {
    e.preventDefault();
    let data = new FormData();
    let file = e.target.files[0];
    data.append('productImage', file);
    this.props.file(id, data, imagePath);
  };


  //フォームの表示
  handleButton = (id, e) => {
    e.preventDefault();
    this.props.editForm(id);
  };

  edit = (id, e) => {
    e.preventDefault();
    const form = e.target.form;
    const title = form.title.value;
    const description = form.description.value;
    const price = form.price.value;
    const editProduct = {
      title: title,
      description: description,
      price: price,
    };
    this.props.edit(id, editProduct);
  };

  render() {
    const product = this.props.products.map(product => {
      if (product.isVisible === true) {
        return (
          <ul key={product.id}>
            <li>{product.title}</li>
            <li>{product.description}</li>
            <li>{product.price}円</li>

            <div>
              <button type="submit" onClick={() => this.delete(product.id)}>
                削除
              </button>
              <button type="submit" onClick={e => this.handleButton(product.id, e)}>
                編集
              </button>
            </div>

            <div>
              <input
                type="file"
                onChange={e => this.handleFileChange(product.id, product.imagePath, e)}
              />
            </div>

            {'image' in product ? (
             <img src={product.image} />
            ) : (
              <img src={'http://design-ec.com/d/e_others_50/m_e_others_501.png'} />
            )}
            {product.editIsVisible && (
              <EditForm product={product} edit={this.edit} id={product.id} />
            )}
          </ul>
        );
      }
    });
    const searchItem = this.props.products.filter(function(value) {
      return value.isVisible === true;
    });

    return (
      <div>
        <h1>商品リスト</h1>
        {product}
        <h3>商品件数は{searchItem.length}件です</h3>
      </div>
    );
  }
}
