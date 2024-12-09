// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI (){}
UI.prototype.addBookToList = function(book){
  const List = document.getElementById('book-list');
  const row = document.createElement('tr')
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class = "delete">X<a></td>`;
  List.appendChild(row);
}

UI.prototype.clearFields = function(){
  document.getElementById('title').value =''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''

}

UI.prototype.alertText = function(message, className){
  //Create div
  const div = document.createElement('div');
  // Add className to div
  div.className = `alert ${className}`;
  //Add textNode to div
  div.appendChild(document.createTextNode(message));
  // Get parantElement
  const container = document.querySelector('.container');
  // The before Sibling
  const form = document.querySelector('#book-form');
  // Insert the div into the parentElement
  container.insertBefore(div, form);
  // Settimeout for the message
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000) 
}

UI.prototype.deleteBook = function(target){
  if(target.className=== 'delete'){
    target.parentElement.parentElement.remove()
  }
}

function Store(){}
Store.prototype.getBooks = function(){
let books;
if(localStorage.getItem('books')===null){
  books = []
}else{
  books = JSON.parse(localStorage.getItem('books'))
}
return books;
}
 Store.prototype.addBooks = function(book){
  const books = Store.prototype.getBooks()
  books.push(book)

  localStorage.setItem('books', JSON.stringify(books))

}
 Store.prototype.displayBooks = function(){
  const books = Store.prototype.getBooks()
  books.forEach(function(book){
    const ui = new UI;
    ui.addBookToList(book);
    
  });

}
Store.prototype.removeBooks = function(isbn){
  const books = Store.prototype.getBooks()
  books.forEach(function(book, index){
    if(book.isbn===isbn){
      books.splice(index, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(books))

}

document.addEventListener('DOMContentLoaded', Store.prototype.displayBooks)

document.getElementById('book-form').addEventListener('submit',function(e){
  // Get the form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  // Instantiate Book
  const book = new Book( title, author, isbn); 
  // Instantiate Store
  const store = new Store(); 
  
   // Instantiate UI
  const ui = new UI();
  if(title==='' || author==='' || isbn===''){
    // alert Message
    ui.alertText('Please fill in the feilds !', 'error');
  }else{
    // add book list
    ui.addBookToList(book);
    store.addBooks(book);
    // alert Message
    ui.alertText('Book Added!', 'success');
    // clear feilds
    ui.clearFields();
  }
   e.preventDefault();
})

document.querySelector('#book-list').addEventListener('click', function(e){
  const store = new Store();
  store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.alertText('Book Removed!', 'success');
  e.preventDefault()
})