import  React from 'react'

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      massages: []
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const messages = [];
    const form = e.target.form
    const title = form.title.value
    const desc = form.desc.value
    const price = form.price.value
    const valid = document.getElementById('valid');

        const titleLength = title.length;
        const descLength = desc.length;
        const priceLength = Number(price);

        if (titleLength === 0 || 10 < titleLength) {
            messages.push('タイトルは1〜10字で入力して下さい');
        }
        if (descLength === 0 || 500 < descLength) {
            messages.push('説明は1〜500字で入力して下さい');
        }
        if (priceLength === 0) {
            messages.push('価格は1円以上で入力して下さい');
        }

    if(messages.length === 0 ){
    this.props.add(title, desc, price)
    this.setState({messages: []});
  }else{
    valid.disabled = true;
    this.setState({messages: messages});
  }


  }

  render() {

    if (typeof this.state.messages === "undefined") {
      console.log("messagesはundefinedです。");
    }

console.log(this.state.messages)


    return (
      <div>
        <h1>ProductForm</h1>
        <form>
          <label>タイトル：</label>
          <input type="text" id="title" placeholder="1〜10字" name="title" />
          <label>説明：</label>
          <input type="text" id="desc" name="desc" placeholder="1〜500字" />
          <label>価格</label>
          <input type="number"  id="price" name="price" placeholder="最低1円" min="1"/>
          <button type="submit" id="valid" onClick={this.onSubmit}>追加</button>
        </form>
       <p>{this.state.messages}</p>
        </div>
    )
  }
}