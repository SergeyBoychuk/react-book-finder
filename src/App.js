import React, { Component } from 'react';
import logo from './logo.svg';
import Button from './Components/Button';
import Input from './Components/Input';
require('./styles/css/App.css');

const Key = require('./API_KEYS/Key');


const amazon = require('amazon-product-api');



const client = amazon.createClient({
  awsId: Key.keys[0].API_KEY,
  awsSecret: Key.keys[0].SECRET_KEY,
  awsTag: "sergeyboychuk-20"
})









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

  // fetchBookByISBN = (isbn) =>{
  //   const filteredIsbn = isbn.replace(/[^\w\s]/gi, '')
  //   fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + filteredIsbn)
  //   .then(results => {
  //     return results.json();
  //   }).then(data => {
  //     console.log(data.items[0].volumeInfo.title);
  //     let books = data.items.map((book) => {
  //       return (
  //         <div className="bookResults" key={data.items}>
  //           <img src={book.volumeInfo.imageLinks.thumbnail}/>
  //           <p>{book.volumeInfo.title}</p>
  //         </div>
  //       )
  //     })
  //     this.setState({books: books});
  //     console.log("state", this.state.books)
      
  //   })
  // }

  fetchBookByISBN = (isbn) =>{
    const filteredIsbn = isbn.replace(/[^\w\s]/gi, '')
    client.itemLookup({
      idType: 'ISBN',
      itemId: filteredIsbn,
      responseGroup: 'ItemAttributes,Offers,Images'
    }, (err, results, response) => {
      if (err) {
        console.log(err);
      } else {
        let books = results[0].DetailPageURL.map((book) => {
          console.log(book);
        });
        console.log(books);
        

        this.setState({booksISBN: books})
        // let eachBook = books.map((key, value) => {
        //   console.log(key, value)
        // })
        // let mappedBooks = Array.prototype.books.forEach((book) => {
        //   return (
        //     <div>
        //       <h1>One book</h1>
        //     </div>
        //   )
        // })
        
        
        
        
        // return (
        //   <div className="bookResults">
        //     <p>Hello</p>
        //   </div>
            
        // )
  
        // return (
        //   <div className="bookResults">
        //     <p>{books[0].ItemAttributes[0].Title}</p>
        //   </div>
        // )
        // console.log(books[0].ItemAttributes[0].Title)
      }
      console.log(this.state.booksISBN)
    });
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
        <div className="bookHolder">
          {this.state.books}
        </div>
      </div>
    );
  }
}

export default App;
