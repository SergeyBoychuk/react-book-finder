import React, { Component } from 'react';
import logo from './logo.svg';
import Button from './Components/Button'
import Input from './Components/Input'
require('./styles/css/App.css');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTextISBN: '',
      inputTextBookName: '',
      booksISBN: [],
      booksName: []
    }
  }

  fetchBookByISBN = (isbn) =>{
    const filteredIsbn = isbn.replace(/[^\w\s]/gi, '')
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + filteredIsbn)
    .then(results => {
      return results.json();
    }).then(data => {
      console.log(data.items[0].volumeInfo.title);
      let books = data.items.map((book) => {
        return (
          <div className="bookResults">
            <img src={book.volumeInfo.imageLinks.thumbnail}/>
            <p>{book.volumeInfo.title}</p>
          </div>
        )
      })
      this.setState({books: books});
      console.log("state", this.state.books)
      
    })
  }

  fetchBookByName = (bookName) => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + bookName)
    .then(results => {
      return results.json();

    }).then(data => {
      console.log(data);
      let books = data.items.map((book) => {
        return (
          <div className="bookResults">
            <img src={book.volumeInfo.imageLinks.thumbnail} />
            <p>{book.volumeInfo.title}</p>
          </div>
        )
      })
      this.setState({books: books});
    })
  }

  handleInputISBN = (e) => {
    this.setState({
      inputTextISBN: e.target.value,
    })
  }

  handleInputBookName = (e) => {
    this.setState({
      inputTextBookName: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="searchContainer">
          <Input changedText={this.handleInputBookName}/>
          {<Button fetchBooks={() => {this.fetchBookByName(this.state.inputTextBookName)}} text="Find Your Book By Name"/>}
        </div>
        <div className="searchContainer">
          <Input changedText={this.handleInputISBN}/>
          <Button fetchBooks={() => {this.fetchBookByISBN(this.state.inputTextISBN)}} text="Find Your Book By ISBN"/>
        </div>
        <div>
          {this.state.books}
        </div>
      </div>
    );
  }
}

export default App;
