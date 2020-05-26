import React from 'react'
export default class ProductForm extends React.Component {
  constructor(props) {
    super(props)
  }
  onSubmit = e => {
    e.preventDefault()
    const form = e.target.form
    const title = form.title.value
    const desc = form.desc.value
    const price = form.price.value
    this.props.add(title, desc, price)
  }

  render() {
    return (
      <div>
        <h1>ProductForm</h1>
        <form>
          <label>タイトル：</label>
          <input type="text" name="title" />
          <label>説明：</label>
          <input type="text" name="desc" />
          <label>価格</label>
          <input type="number" name="price" />
          <button type="submit" onClick={this.onSubmit}>追加</button>
        </form>
      </div>
    )
  }
}