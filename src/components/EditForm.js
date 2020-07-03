import React from 'react';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  isValid = (id, e) => {
    e.preventDefault();
    const messages = [];
    const form = e.target.form;
    const title = form.title.value;
    const desc = form.description.value;
    const price = form.price.value;
    const valid = document.getElementById('validate');

    const titleLength = title.length;
    const descLength = desc.length;
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
      this.props.edit(id, e);
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
        <form id="view">
          <label>タイトル：</label>
          <input name="title" type="text" defaultValue={this.props.product.title}></input>
          <label>説明</label>
          <input name="description" type="text" defaultValue={this.props.product.description}></input>
          <label>価格</label>
          <input name="price" type="number" defaultValue={this.props.product.price} min="1"></input>
          <button type="submit" id="validate" onClick={e => this.isValid(this.props.id, e)}>
            更新
          </button>
        </form>
        {messageList}
      </div>
    );
  }
}