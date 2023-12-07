// book class 
class Book{

constructor(title, author, isbn){

    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

}

// UI Class
class UI {
   static displayBooks(){

    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
   }
   
   static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML= `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class ="btn btn-sm delete">X</a></td>
    
    `;
    list.appendChild(row);

   }

   static deleteBook(el){
    if (el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
    }

   }

   static showAlert(message, className){

    const div = document.createElement('div');
    div.className = ` alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    // vanish in 3 sec
    setTimeout(()=>
        document.querySelector('.alert').remove(),3000
    );
   }


   static clearFields(){


    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
   }


}

//store Class

class Store{

    static getBooks(){

        let books;
        if (localStorage.getItem('books') === null) {
            books = [];

        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){

        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('book', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books));

    }

}

// Event: 

// Display Books Event 
                                                                                                                                                                                                                                                                                      
document.addEventListener('DOMContentLoaded' , UI.displayBooks);
// Add Book Event
document.querySelector('#book-form').addEventListener('submit' , (e) =>{
    e.preventDefault();
    // get form value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validation

    if (title === ''|| author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger')
    }else {
        //instantiate book

        const book = new Book(title, author, isbn);
        //add to UI
        UI.addBookToList(book);
        //add to store
        Store.addBook(book);
        // show success message
        UI.showAlert('Book Added!', 'success');
        //clear fields
        UI.clearFields();
    }
});




// Remove Book Event

document.querySelector('#book-list').addEventListener('click', (e)=>{

    //remove from ui
    UI.deleteBook(e.target);
    //remove from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //show alert
    UI.showAlert("Book Removed", "success");
});
