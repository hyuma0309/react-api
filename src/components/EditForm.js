
import React from 'react'

export default class ProductItem extends React.Component {
    constructor(props) {
        super(props)
      }


render(){
    return(
        <div>
              <form>
              <label>タイトル：</label>
              <input name = "title" type = "text" ></input>
              <label>説明</label>
              <input name ="desc"  type = "text"></input>
              <label>価格</label>
              <input name = "price" type = "number" ></input>
              <button type="submit" onClick={(e) => this.props.edit(this.props.id, e)}>更新</button>
              </form>
          </div>

    )
}



}