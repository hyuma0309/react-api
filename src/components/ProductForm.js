import React from 'react';

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

   onSubmit = e => {
    e.preventDefault();
    const messages = [];
    const form = e.target.form;
    const title = form.title.value;
    const description = form.description.value;
    const price = form.price.value;
    const valid = document.getElementById('valid');

        const titleLength = title.length;
        const descLength = description.length;
        const priceNumber = Number(price);



    if (titleLength === 0 || 10 < titleLength) {
      messages.push('タイトルは1〜10字で入力して下さい');
    }
    if (descLength === 0 || 500 < descLength) {
      messages.push('説明は1〜500字で入力して下さい');
    }
    if (!Number.isInteger(priceNumber) || priceNumber < 1 || priceNumber > 1000000) {
      messages.push('価格は1円以上100万円以下で入力して下さい');
    }
    if (messages.length === 0) {
      this.props.add(title, description, price);
      this.setState({ messages: [] });
    } else {
      valid.disabled = true;
      this.setState({ messages: messages });
    }
  };

  render() {
    const messageList = this.state.messages.map(message => {
      return (
        <ul key={message}>
          <li>{message}</li>
        </ul>
      );
    });

    return (
      <div>
        <h1>ProductForm</h1>
        <form>
          <label>商品名</label>
          <input type="text" id="title" placeholder="1〜10字" name="title" />
          <label>説明</label>
          <input type="text" id="description" name="description" placeholder="1〜500字" />
          <label>価格</label>
          <input type="number" id="price" name="price" placeholder="1円以上100万円以下" min="1" />
          <button type="submit" id="valid" onClick={this.onSubmit}>追加</button>
        </form>
        {messageList}
      </div>
    );
  }
}
