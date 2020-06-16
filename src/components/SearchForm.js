import React from 'react'
export default class SearchForm extends React.Component {
  
  onClickSearch = e => {
    e.preventDefault();
    const word = e.target.form.word.value;
    this.props.search(word);
};


  render() {
    return (
        <form>
        <label>タイトルで検索</label>
        <input type="text" name="word" />
        <button type="submit" onClick={this.onClickSearch}>検索</button>
        </form>
    )
  }
}