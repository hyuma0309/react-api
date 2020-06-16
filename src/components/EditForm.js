
import React from 'react';

export default class ProductItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    isValid = (id,e) => {
        e.preventDefault();
        const messages = [];
        const form = e.target.form
        const title = form.title.value
        const desc = form.desc.value
        const price = form.price.value
        const valid = document.getElementById('validate');


        const titleLength = title.length;
        const descLength = desc.length;
        const priceLength = Number(price);

        if (titleLength === 0 || 100 < titleLength) {
            messages.push('1〜100字で入力して下さい');
        }
        if (descLength === 0 || 500 < descLength) {
            messages.push('1〜500字で入力して下さい');
        }
        if (priceLength === 0 || 10 < priceLength) {
            messages.push('10以上の整数で入力して下さい');
        }

        if (messages.length === 0) {
            this.props.edit(id, e)
            this.setState({messages: []});
        } else {
            valid.disabled = true;
            this.setState({messages: messages});
        }

    };


render(){


    return(
        <div>
              <form id="view">
              <label>タイトル：</label>
              <input name = "title" type = "text" placeholder="最大10文字" ></input>
              <label>説明</label>
              <input name ="desc"  type = "text" placeholder="最大500文字" ></input>
              <label>価格</label>
              <input name = "price" type = "number" placeholder="最低10円"  ></input>
              <button type="submit" id="validate" onClick={(e) => this.isValid(this.props.id, e)}>更新</button>
              </form>
              <p>{this.state.messages}</p>
          </div>

    )
}



}